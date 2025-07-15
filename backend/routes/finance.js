import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Transaction from '../models/Transaction.js';
import SavingsGoal from '../models/SavingsGoal.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected (require authentication)
router.use(protect);

// ==================== TRANSACTIONS ====================

// @desc    Get user's transactions
// @route   GET /api/finance/transactions
// @access  Private
router.get('/transactions', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  query('category').optional().trim(),
  query('startDate').optional().isISO8601().withMessage('Start date must be valid ISO date'),
  query('endDate').optional().isISO8601().withMessage('End date must be valid ISO date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 20,
      type,
      category,
      startDate,
      endDate,
      sortBy = 'date',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = { userId: req.user._id };
    
    if (type) filter.type = type;
    if (category) filter.category = new RegExp(category, 'i');
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const transactions = await Transaction.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      data: {
        transactions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error getting transactions'
    });
  }
});

// @desc    Create new transaction
// @route   POST /api/finance/transactions
// @access  Private
router.post('/transactions', [
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('description').optional().trim().isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters'),
  body('date').optional().isISO8601().withMessage('Date must be valid ISO date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { type, category, amount, description, date, tags } = req.body;

    const transaction = await Transaction.create({
      userId: req.user._id,
      type,
      category,
      amount,
      description: description || '',
      date: date || new Date(),
      tags: tags || []
    });

    res.status(201).json({
      status: 'success',
      message: 'Transaction created successfully',
      data: {
        transaction
      }
    });

  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error creating transaction'
    });
  }
});

// @desc    Update transaction
// @route   PUT /api/finance/transactions/:id
// @access  Private
router.put('/transactions/:id', [
  body('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('amount').optional().isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('description').optional().trim().isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters'),
  body('date').optional().isISO8601().withMessage('Date must be valid ISO date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({
        status: 'error',
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Transaction updated successfully',
      data: {
        transaction
      }
    });

  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error updating transaction'
    });
  }
});

// @desc    Delete transaction
// @route   DELETE /api/finance/transactions/:id
// @access  Private
router.delete('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({
        status: 'error',
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Transaction deleted successfully'
    });

  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error deleting transaction'
    });
  }
});

// @desc    Get user's financial summary
// @route   GET /api/finance/summary
// @access  Private
router.get('/summary', async (req, res) => {
  try {
    const { year, month } = req.query;
    
    // Get overall balance
    const balance = await Transaction.getUserBalance(req.user._id);
    
    // Get monthly summary if year and month provided
    let monthlySummary = null;
    if (year && month) {
      monthlySummary = await Transaction.getMonthlySummary(
        req.user._id,
        parseInt(year),
        parseInt(month)
      );
    }

    // Get savings goals summary
    const goalsSummary = await SavingsGoal.getUserSummary(req.user._id);

    res.status(200).json({
      status: 'success',
      data: {
        balance,
        monthlySummary,
        goalsSummary
      }
    });

  } catch (error) {
    console.error('Get summary error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error getting financial summary'
    });
  }
});

// ==================== SAVINGS GOALS ====================

// @desc    Get user's savings goals
// @route   GET /api/finance/goals
// @access  Private
router.get('/goals', async (req, res) => {
  try {
    const goals = await SavingsGoal.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: {
        goals
      }
    });

  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error getting savings goals'
    });
  }
});

// @desc    Create new savings goal
// @route   POST /api/finance/goals
// @access  Private
router.post('/goals', [
  body('name').trim().notEmpty().withMessage('Goal name is required'),
  body('targetAmount').isFloat({ min: 1 }).withMessage('Target amount must be greater than 0'),
  body('deadline').isISO8601().withMessage('Deadline must be valid ISO date'),
  body('currentAmount').optional().isFloat({ min: 0 }).withMessage('Current amount cannot be negative'),
  body('category').optional().isIn(['emergency', 'vacation', 'education', 'home', 'car', 'investment', 'other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, description, targetAmount, currentAmount, deadline, category, priority, color } = req.body;

    const goal = await SavingsGoal.create({
      userId: req.user._id,
      name,
      description: description || '',
      targetAmount,
      currentAmount: currentAmount || 0,
      deadline,
      category: category || 'other',
      priority: priority || 'medium',
      color: color || 'from-purple-400 to-purple-600'
    });

    res.status(201).json({
      status: 'success',
      message: 'Savings goal created successfully',
      data: {
        goal
      }
    });

  } catch (error) {
    console.error('Create goal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error creating savings goal'
    });
  }
});

// @desc    Add contribution to savings goal
// @route   POST /api/finance/goals/:id/contribute
// @access  Private
router.post('/goals/:id/contribute', [
  body('amount').isFloat({ min: 0.01 }).withMessage('Contribution amount must be greater than 0'),
  body('note').optional().trim().isLength({ max: 200 }).withMessage('Note cannot exceed 200 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { amount, note } = req.body;

    const goal = await SavingsGoal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Savings goal not found'
      });
    }

    await goal.addContribution(amount, note || '');

    res.status(200).json({
      status: 'success',
      message: 'Contribution added successfully',
      data: {
        goal
      }
    });

  } catch (error) {
    console.error('Add contribution error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error adding contribution'
    });
  }
});

// @desc    Update savings goal
// @route   PUT /api/finance/goals/:id
// @access  Private
router.put('/goals/:id', [
  body('name').optional().trim().notEmpty().withMessage('Goal name cannot be empty'),
  body('targetAmount').optional().isFloat({ min: 1 }).withMessage('Target amount must be greater than 0'),
  body('deadline').optional().isISO8601().withMessage('Deadline must be valid ISO date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const goal = await SavingsGoal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Savings goal not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Savings goal updated successfully',
      data: {
        goal
      }
    });

  } catch (error) {
    console.error('Update goal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error updating savings goal'
    });
  }
});

// @desc    Delete savings goal
// @route   DELETE /api/finance/goals/:id
// @access  Private
router.delete('/goals/:id', async (req, res) => {
  try {
    const goal = await SavingsGoal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Savings goal not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Savings goal deleted successfully'
    });

  } catch (error) {
    console.error('Delete goal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error deleting savings goal'
    });
  }
});

export default router;
