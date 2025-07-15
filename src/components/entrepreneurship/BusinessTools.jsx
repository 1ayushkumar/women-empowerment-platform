import { useState  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DocumentTextIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  PresentationChartLineIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

function BusinessTools() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showToolModal, setShowToolModal] = useState(false);
  const [businessPlan, setBusinessPlan] = useState({
    companyName: '',
    industry: '',
    mission: '',
    targetMarket: '',
    revenue: '',
    expenses: '',
    businessDescription: '',
    competitiveAdvantage: '',
    marketingStrategy: '',
    operationalPlan: '',
    managementTeam: '',
    fundingNeeds: '',
    riskAnalysis: ''
  });
  const [showPlanPreview, setShowPlanPreview] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [financialData, setFinancialData] = useState({
    income: [],
    expenses: [],
    currentBalance: 0
  });

  const tools = [
    {
      id: 'business-plan',
      name: 'Business Plan Generator',
      description: 'Create professional business plans with our step-by-step guide',
      icon: DocumentTextIcon,
      features: [
        'Industry-specific templates',
        'Financial projections calculator',
        'Executive summary builder',
        'Export to PDF/Word'
      ],
      form: {
        fields: [
          { name: 'companyName', label: 'Company Name', type: 'text', required: true },
          { name: 'industry', label: 'Industry', type: 'select', options: ['Technology', 'Retail', 'Healthcare', 'Food & Beverage', 'Fashion', 'Education', 'Consulting', 'Manufacturing', 'Other'], required: true },
          { name: 'businessDescription', label: 'Business Description', type: 'textarea', placeholder: 'Describe what your business does, products/services offered...' },
          { name: 'mission', label: 'Mission Statement', type: 'textarea', placeholder: 'What is your company\'s purpose and core values?' },
          { name: 'targetMarket', label: 'Target Market', type: 'textarea', placeholder: 'Who are your ideal customers? Demographics, needs, behaviors...' },
          { name: 'competitiveAdvantage', label: 'Competitive Advantage', type: 'textarea', placeholder: 'What makes your business unique? How do you differentiate from competitors?' },
          { name: 'marketingStrategy', label: 'Marketing Strategy', type: 'textarea', placeholder: 'How will you reach and acquire customers?' },
          { name: 'operationalPlan', label: 'Operations Plan', type: 'textarea', placeholder: 'How will your business operate day-to-day?' },
          { name: 'managementTeam', label: 'Management Team', type: 'textarea', placeholder: 'Key team members and their roles/experience...' },
          { name: 'revenue', label: 'Expected Monthly Revenue (₹)', type: 'number', required: true },
          { name: 'expenses', label: 'Expected Monthly Expenses (₹)', type: 'number', required: true },
          { name: 'fundingNeeds', label: 'Funding Requirements', type: 'textarea', placeholder: 'How much funding do you need and what will it be used for?' },
          { name: 'riskAnalysis', label: 'Risk Analysis', type: 'textarea', placeholder: 'What are the main risks and how will you mitigate them?' }
        ]
      }
    },
    {
      id: 'financial',
      name: 'Financial Tools',
      description: 'Track expenses, create budgets, and manage cash flow',
      icon: ChartBarIcon,
      features: [
        'Expense tracking',
        'Budget planning',
        'Cash flow forecasting',
        'Financial reports'
      ],
      form: {
        fields: [
          { name: 'transactionType', label: 'Transaction Type', type: 'select', options: ['Income', 'Expense'] },
          { name: 'amount', label: 'Amount', type: 'number' },
          { name: 'category', label: 'Category', type: 'select', options: ['Sales', 'Services', 'Supplies', 'Marketing', 'Utilities', 'Rent', 'Other'] },
          { name: 'description', label: 'Description', type: 'text' },
          { name: 'date', label: 'Date', type: 'date' }
        ]
      }
    },
    {
      id: 'market',
      name: 'Market Analysis',
      description: 'Research your market and analyze competitors',
      icon: PresentationChartLineIcon,
      features: [
        'Market size calculator',
        'Competitor analysis',
        'Customer segmentation',
        'Trend analysis'
      ]
    },
    {
      id: 'pricing',
      name: 'Pricing Strategy',
      description: 'Optimize your pricing for maximum profitability',
      icon: CurrencyDollarIcon,
      features: [
        'Price calculator',
        'Margin analysis',
        'Competitor price tracking',
        'Pricing models'
      ]
    },
    {
      id: 'planning',
      name: 'Project Planning',
      description: 'Plan and track your business projects efficiently',
      icon: CalendarIcon,
      features: [
        'Timeline creation',
        'Task management',
        'Resource allocation',
        'Progress tracking'
      ]
    },
    {
      id: 'checklist',
      name: 'Startup Checklist',
      description: 'Stay organized with comprehensive startup checklists',
      icon: ClipboardDocumentCheckIcon,
      features: [
        'Legal requirements',
        'Business registration',
        'Licensing guide',
        'Insurance checklist'
      ]
    }
  ];

  const handleToolClick = (tool) => {
    setSelectedTool(selectedTool?.id === tool.id ? null : tool);
  };

  const handleToolLaunch = (tool, e) => {
    e.stopPropagation();
    setSelectedTool(tool);
    setShowToolModal(true);
  };

  const handleInputChange = (e, toolId) => {
    const { name, value } = e.target;
    
    if (toolId === 'business-plan') {
      setBusinessPlan(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (toolId === 'financial') {
      if (name === 'amount') {
        const newTransaction = {
          type: e.target.form.transactionType.value,
          amount: parseFloat(value),
          category: e.target.form.category.value,
          description: e.target.form.description.value,
          date: e.target.form.date.value
        };
        
        setFinancialData(prev => {
          const newData = { ...prev };
          if (newTransaction.type === 'Income') {
            newData.income = [...prev.income, newTransaction];
            newData.currentBalance += newTransaction.amount;
          } else {
            newData.expenses = [...prev.expenses, newTransaction];
            newData.currentBalance -= newTransaction.amount;
          }
          return newData;
        });
      }
    }
  };

  const handleFormSubmit = (e, toolId) => {
    e.preventDefault();
    if (toolId === 'business-plan') {
      // Validate form
      const errors = validateBusinessPlan(businessPlan);
      if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return;
      }

      // Generate business plan
      const plan = generateBusinessPlan(businessPlan);
      setGeneratedPlan(plan);
      setShowPlanPreview(true);
    }
  };

  const handleDownloadPlan = () => {
    downloadBusinessPlan(generatedPlan);
    setShowPlanPreview(false);
  };

  const validateBusinessPlan = (data) => {
    const errors = [];
    if (!data.companyName.trim()) errors.push('Company Name is required');
    if (!data.industry) errors.push('Industry is required');
    if (!data.revenue || data.revenue <= 0) errors.push('Expected Monthly Revenue must be greater than 0');
    if (!data.expenses || data.expenses < 0) errors.push('Expected Monthly Expenses must be 0 or greater');
    return errors;
  };

  const generateBusinessPlan = (data) => {
    const currentDate = new Date().toLocaleDateString();
    const monthlyProfit = (data.revenue || 0) - (data.expenses || 0);
    const annualRevenue = (data.revenue || 0) * 12;
    const annualExpenses = (data.expenses || 0) * 12;
    const annualProfit = monthlyProfit * 12;

    return `
# ${data.companyName || '[Company Name]'} - Comprehensive Business Plan

**Generated on:** ${currentDate}
**Industry:** ${data.industry || '[Industry]'}

---

## 1. EXECUTIVE SUMMARY

### Company Overview
${data.companyName || '[Company Name]'} is a ${data.industry || '[Industry]'} company ${data.businessDescription ? 'that ' + data.businessDescription.toLowerCase() : 'focused on delivering exceptional value to our customers'}.

### Mission Statement
${data.mission || 'To provide exceptional products/services that meet our customers\' needs while building a sustainable and profitable business.'}

### Key Success Factors
${data.competitiveAdvantage || 'Our competitive advantages include innovative solutions, exceptional customer service, and strategic market positioning.'}

### Financial Highlights
- **Projected Monthly Revenue:** ₹${(data.revenue || 0).toLocaleString('en-IN')}
- **Projected Monthly Expenses:** ₹${(data.expenses || 0).toLocaleString('en-IN')}
- **Projected Monthly Profit:** ₹${monthlyProfit.toLocaleString('en-IN')}
- **Projected Annual Revenue:** ₹${annualRevenue.toLocaleString('en-IN')}
- **Projected Annual Profit:** ₹${annualProfit.toLocaleString('en-IN')}

---

## 2. COMPANY DESCRIPTION

### Business Overview
${data.businessDescription || 'Our business focuses on delivering high-quality products/services to meet market demands and customer needs.'}

### Products and Services
${data.businessDescription ? 'As detailed above, our offerings include comprehensive solutions designed to address specific market needs.' : 'We offer a range of products/services tailored to our target market\'s specific requirements.'}

---

## 3. MARKET ANALYSIS

### Target Market
${data.targetMarket || 'Our target market consists of customers who value quality, reliability, and excellent service. We focus on understanding their needs and delivering solutions that exceed expectations.'}

### Competitive Analysis
${data.competitiveAdvantage || 'We differentiate ourselves through innovation, customer service excellence, and strategic positioning in the market. Our unique value proposition sets us apart from competitors.'}

---

## 4. MARKETING & SALES STRATEGY

### Marketing Approach
${data.marketingStrategy || 'Our marketing strategy focuses on digital channels, customer referrals, and strategic partnerships. We emphasize building strong relationships with our customers and delivering consistent value.'}

### Sales Strategy
We will implement a multi-channel sales approach that includes:
- Direct sales to customers
- Online presence and e-commerce
- Strategic partnerships
- Customer referral programs

---

## 5. OPERATIONS PLAN

### Operational Structure
${data.operationalPlan || 'Our operations are designed for efficiency and scalability. We focus on streamlined processes, quality control, and continuous improvement to ensure customer satisfaction and business growth.'}

### Management Team
${data.managementTeam || 'Our management team brings together diverse experience and expertise to drive the company\'s success. Key roles include leadership, operations, marketing, and financial management.'}

---

## 6. FINANCIAL PROJECTIONS

### Revenue Model
Our primary revenue streams include:
- Product/Service sales
- Recurring revenue opportunities
- Additional value-added services

### Monthly Financial Projections
| Category | Amount |
|----------|--------|
| **Revenue** | ₹${(data.revenue || 0).toLocaleString('en-IN')} |
| **Expenses** | ₹${(data.expenses || 0).toLocaleString('en-IN')} |
| **Net Profit** | ₹${monthlyProfit.toLocaleString('en-IN')} |
| **Profit Margin** | ${data.revenue > 0 ? ((monthlyProfit / data.revenue) * 100).toFixed(1) : '0'}% |

### Annual Financial Projections
| Category | Year 1 |
|----------|--------|
| **Revenue** | ₹${annualRevenue.toLocaleString('en-IN')} |
| **Expenses** | ₹${annualExpenses.toLocaleString('en-IN')} |
| **Net Profit** | ₹${annualProfit.toLocaleString('en-IN')} |

---

## 7. FUNDING REQUIREMENTS

### Capital Needs
${data.fundingNeeds || 'We are seeking funding to support business growth, operational expansion, and market development. The investment will be used for equipment, marketing, working capital, and strategic initiatives.'}

### Use of Funds
- Operations and working capital: 40%
- Marketing and customer acquisition: 30%
- Equipment and technology: 20%
- Contingency and growth opportunities: 10%

---

## 8. RISK ANALYSIS

### Identified Risks
${data.riskAnalysis || 'Key business risks include market competition, economic conditions, operational challenges, and regulatory changes. We have developed mitigation strategies for each identified risk area.'}

### Risk Mitigation Strategies
- Diversified revenue streams
- Strong financial management
- Continuous market monitoring
- Flexible operational structure
- Insurance and legal protection

---

## 9. IMPLEMENTATION TIMELINE

### Phase 1 (Months 1-3): Foundation
- Finalize business setup and legal requirements
- Establish operational processes
- Begin marketing and customer acquisition

### Phase 2 (Months 4-6): Growth
- Scale operations based on initial results
- Expand marketing efforts
- Optimize processes and systems

### Phase 3 (Months 7-12): Expansion
- Evaluate expansion opportunities
- Develop strategic partnerships
- Plan for future growth phases

---

## 10. CONCLUSION

${data.companyName || '[Company Name]'} is positioned for success in the ${data.industry || '[Industry]'} market. With our strong value proposition, experienced team, and comprehensive strategy, we are confident in achieving our financial projections and business objectives.

This business plan serves as our roadmap for building a sustainable and profitable enterprise that delivers value to customers, stakeholders, and the community.

---

**Document prepared by:** ${data.companyName || '[Company Name]'} Management Team
**Date:** ${currentDate}
**Version:** 1.0

*This business plan is confidential and proprietary. Distribution should be limited to authorized parties only.*
    `;
  };

  const downloadBusinessPlan = (content) => {
    const companyName = businessPlan.companyName || 'Business';
    const fileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_Business_Plan.txt`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool?.id === tool.id;
          
          return (
            <motion.div
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className={`
                cursor-pointer bg-white rounded-xl p-6 shadow-md hover:shadow-lg
                ${isSelected ? 'ring-2 ring-purple-500' : ''}
                transition-all duration-200
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      {tool.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                      <button
                        className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                        onClick={(e) => handleToolLaunch(tool, e)}
                      >
                        Launch Tool
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tool Modal */}
      <AnimatePresence>
        {showToolModal && selectedTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedTool.name}</h2>
                <button
                  onClick={() => setShowToolModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {selectedTool.form && (
                <form onSubmit={(e) => handleFormSubmit(e, selectedTool.id)} className="space-y-4">
                  {selectedTool.form.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={selectedTool.id === 'business-plan' ? businessPlan[field.name] || '' : ''}
                          onChange={(e) => handleInputChange(e, selectedTool.id)}
                          required={field.required}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          value={selectedTool.id === 'business-plan' ? businessPlan[field.name] || '' : ''}
                          onChange={(e) => handleInputChange(e, selectedTool.id)}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          rows={3}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={selectedTool.id === 'business-plan' ? businessPlan[field.name] || '' : ''}
                          onChange={(e) => handleInputChange(e, selectedTool.id)}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      )}
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <DocumentTextIcon className="w-5 h-5" />
                    <span>{selectedTool.id === 'business-plan' ? 'Generate Professional Business Plan' : 'Save'}</span>
                  </button>
                </form>
              )}

              {selectedTool.id === 'financial' && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg font-medium">
                      Current Balance: ₹{financialData.currentBalance.toFixed(2)}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600">Income</h4>
                        {financialData.income.map((item, index) => (
                          <div key={index} className="text-sm mt-2">
                            <p className="font-medium">{item.description}</p>
                            <p className="text-gray-600">
                              ₹{item.amount.toFixed(2)} - {item.category}
                            </p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600">Expenses</h4>
                        {financialData.expenses.map((item, index) => (
                          <div key={index} className="text-sm mt-2">
                            <p className="font-medium">{item.description}</p>
                            <p className="text-gray-600">
                              ₹{item.amount.toFixed(2)} - {item.category}
                            </p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-purple-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Need Help Getting Started?</h3>
        <p className="text-gray-600 mb-4">
          Our business experts are here to guide you through using these tools effectively.
        </p>
        <button
          className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          onClick={() => {
            // Handle consultation booking
            setShowToolModal(true);
            setSelectedTool({
              id: 'consultation',
              name: 'Book a Consultation',
              form: {
                fields: [
                  { name: 'name', label: 'Your Name', type: 'text' },
                  { name: 'email', label: 'Email Address', type: 'email' },
                  { name: 'phone', label: 'Phone Number', type: 'tel' },
                  { name: 'date', label: 'Preferred Date', type: 'date' },
                  { name: 'time', label: 'Preferred Time', type: 'time' },
                  { name: 'topic', label: 'Consultation Topic', type: 'select', options: ['Business Planning', 'Financial Management', 'Market Research', 'Pricing Strategy', 'Other'] }
                ]
              }
            });
          }}
        >
          Book a Free Consultation
        </button>
      </div>

      {/* Business Plan Preview Modal */}
      {showPlanPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-purple-600 text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">Business Plan Preview</h3>
                <p className="text-purple-200 text-sm">{businessPlan.companyName || 'Your Business'}</p>
              </div>
              <button
                onClick={() => setShowPlanPreview(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg">
                  {generatedPlan}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <p>✅ Professional business plan generated</p>
                <p>📄 Ready for download as text file</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPlanPreview(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleDownloadPlan}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <DocumentTextIcon className="w-5 h-5" />
                  <span>Download Plan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessTools;
