import mongoose from 'mongoose';

const savingsGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Goal name is required'],
    trim: true,
    maxlength: [100, 'Goal name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  targetAmount: {
    type: Number,
    required: [true, 'Target amount is required'],
    min: [1, 'Target amount must be greater than 0']
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: [0, 'Current amount cannot be negative']
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Deadline must be in the future'
    }
  },
  color: {
    type: String,
    default: 'from-purple-400 to-purple-600',
    trim: true
  },
  category: {
    type: String,
    enum: ['emergency', 'vacation', 'education', 'home', 'car', 'investment', 'other'],
    default: 'other'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  autoSave: {
    enabled: { type: Boolean, default: false },
    amount: { type: Number, min: 0 },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly']
    },
    nextSaveDate: Date
  },
  milestones: [{
    percentage: {
      type: Number,
      min: 0,
      max: 100
    },
    amount: Number,
    achievedAt: Date,
    note: String
  }],
  contributions: [{
    amount: {
      type: Number,
      required: true,
      min: 0.01
    },
    date: {
      type: Date,
      default: Date.now
    },
    note: String,
    source: {
      type: String,
      enum: ['manual', 'auto-save', 'bonus', 'gift'],
      default: 'manual'
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
savingsGoalSchema.index({ userId: 1, deadline: 1 });
savingsGoalSchema.index({ userId: 1, isCompleted: 1 });
savingsGoalSchema.index({ userId: 1, priority: 1 });

// Virtual for progress percentage
savingsGoalSchema.virtual('progressPercentage').get(function() {
  return Math.min((this.currentAmount / this.targetAmount) * 100, 100);
});

// Virtual for remaining amount
savingsGoalSchema.virtual('remainingAmount').get(function() {
  return Math.max(this.targetAmount - this.currentAmount, 0);
});

// Virtual for days remaining
savingsGoalSchema.virtual('daysRemaining').get(function() {
  const today = new Date();
  const deadline = new Date(this.deadline);
  const diffTime = deadline - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for monthly savings needed
savingsGoalSchema.virtual('monthlySavingsNeeded').get(function() {
  const daysRemaining = this.daysRemaining;
  if (daysRemaining <= 0) return 0;
  
  const monthsRemaining = daysRemaining / 30;
  return this.remainingAmount / monthsRemaining;
});

// Virtual for status
savingsGoalSchema.virtual('status').get(function() {
  if (this.isCompleted) return 'completed';
  if (this.daysRemaining < 0) return 'overdue';
  if (this.daysRemaining <= 30) return 'urgent';
  if (this.progressPercentage >= 75) return 'on-track';
  return 'in-progress';
});

// Pre-save middleware to check completion
savingsGoalSchema.pre('save', function(next) {
  if (this.currentAmount >= this.targetAmount && !this.isCompleted) {
    this.isCompleted = true;
    this.completedAt = new Date();
  } else if (this.currentAmount < this.targetAmount && this.isCompleted) {
    this.isCompleted = false;
    this.completedAt = undefined;
  }
  next();
});

// Method to add contribution
savingsGoalSchema.methods.addContribution = function(amount, note = '', source = 'manual') {
  this.contributions.push({
    amount,
    note,
    source,
    date: new Date()
  });
  
  this.currentAmount += amount;
  
  // Check for milestone achievements
  const newPercentage = this.progressPercentage;
  const milestoneThresholds = [25, 50, 75, 100];
  
  milestoneThresholds.forEach(threshold => {
    const existingMilestone = this.milestones.find(m => m.percentage === threshold);
    if (!existingMilestone && newPercentage >= threshold) {
      this.milestones.push({
        percentage: threshold,
        amount: (this.targetAmount * threshold) / 100,
        achievedAt: new Date(),
        note: `${threshold}% milestone achieved!`
      });
    }
  });
  
  return this.save();
};

// Static method to get user's goals summary
savingsGoalSchema.statics.getUserSummary = async function(userId) {
  const goals = await this.find({ userId });
  
  const summary = {
    totalGoals: goals.length,
    completedGoals: goals.filter(g => g.isCompleted).length,
    totalTargetAmount: goals.reduce((sum, g) => sum + g.targetAmount, 0),
    totalCurrentAmount: goals.reduce((sum, g) => sum + g.currentAmount, 0),
    urgentGoals: goals.filter(g => g.daysRemaining <= 30 && !g.isCompleted).length,
    overdueGoals: goals.filter(g => g.daysRemaining < 0 && !g.isCompleted).length
  };
  
  summary.overallProgress = summary.totalTargetAmount > 0 
    ? (summary.totalCurrentAmount / summary.totalTargetAmount) * 100 
    : 0;
    
  return summary;
};

const SavingsGoal = mongoose.model('SavingsGoal', savingsGoalSchema);

export default SavingsGoal;
