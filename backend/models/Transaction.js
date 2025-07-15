import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Transaction type is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  date: {
    type: Date,
    required: [true, 'Transaction date is required'],
    default: Date.now
  },
  tags: [String],
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringDetails: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    nextDate: Date,
    endDate: Date
  },
  attachments: [{
    filename: String,
    url: String,
    uploadDate: { type: Date, default: Date.now }
  }],
  location: {
    name: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, type: 1 });
transactionSchema.index({ userId: 1, category: 1 });
transactionSchema.index({ date: -1 });

// Virtual for formatted amount in INR
transactionSchema.virtual('formattedAmount').get(function() {
  return `₹${this.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
});

// Virtual for month-year grouping
transactionSchema.virtual('monthYear').get(function() {
  return `${this.date.getFullYear()}-${String(this.date.getMonth() + 1).padStart(2, '0')}`;
});

// Static method to get user's balance
transactionSchema.statics.getUserBalance = async function(userId) {
  const result = await this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' }
      }
    }
  ]);

  const income = result.find(r => r._id === 'income')?.total || 0;
  const expense = result.find(r => r._id === 'expense')?.total || 0;
  
  return {
    income,
    expense,
    balance: income - expense
  };
};

// Static method to get monthly summary
transactionSchema.statics.getMonthlySummary = async function(userId, year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  return await this.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: {
          type: '$type',
          category: '$category'
        },
        total: { $sum: '$amount' },
        count: { $sum: 1 },
        transactions: { $push: '$$ROOT' }
      }
    },
    {
      $group: {
        _id: '$_id.type',
        categories: {
          $push: {
            category: '$_id.category',
            total: '$total',
            count: '$count'
          }
        },
        totalAmount: { $sum: '$total' }
      }
    }
  ]);
};

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
