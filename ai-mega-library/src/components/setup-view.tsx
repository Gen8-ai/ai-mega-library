import React, { useState } from 'react';
import { 
  Brain,
  Settings,
  Database,
  Wrench,
  Code,
  Server,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SetupView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [configuration, setConfiguration] = useState({
    projectName: '',
    modelType: 'transformer',
    dataSource: 'csv',
    environment: 'development'
  });

  const steps = [
    {
      id: 1,
      title: 'Project Configuration',
      icon: Settings,
      fields: [
        { name: 'projectName', label: 'Project Name', type: 'text', placeholder: 'my-ai-project' },
        { 
          name: 'modelType', 
          label: 'Model Architecture', 
          type: 'select',
          options: ['transformer', 'cnn', 'rnn', 'hybrid']
        }
      ]
    },
    {
      id: 2,
      title: 'Data Integration',
      icon: Database,
      fields: [
        { 
          name: 'dataSource', 
          label: 'Data Source', 
          type: 'select',
          options: ['csv', 'api', 'database', 'streaming']
        },
        { 
          name: 'dataFormat', 
          label: 'Data Format', 
          type: 'select',
          options: ['tabular', 'text', 'image', 'mixed']
        }
      ]
    },
    {
      id: 3,
      title: 'Environment Setup',
      icon: Wrench,
      fields: [
        { 
          name: 'environment', 
          label: 'Environment', 
          type: 'select',
          options: ['development', 'staging', 'production']
        },
        { 
          name: 'deployment', 
          label: 'Deployment Platform', 
          type: 'select',
          options: ['local', 'cloud', 'hybrid']
        }
      ]
    }
  ];

  const handleInputChange = (field, value) => {
    setConfiguration(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const SystemRequirements = () => (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>Node.js v18+</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>Python 3.9+</span>
      </div>
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        <span>CUDA Toolkit (Optional)</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Brain className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Quazo AI Setup</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Steps Navigation */}
          <div className="space-y-4">
            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    currentStep === step.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-white border border-gray-200'
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <StepIcon 
                    className={`h-5 w-5 ${
                      currentStep === step.id ? 'text-blue-500' : 'text-gray-400'
                    }`} 
                  />
                  <span className={currentStep === step.id ? 'font-medium' : ''}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Current Step Form */}
          <div className="col-span-2 bg-white p-6 rounded-lg border shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-medium">{steps[currentStep - 1].title}</h2>
              </div>

              <div className="space-y-4">
                {steps[currentStep - 1].fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        className="w-full border rounded-lg p-2"
                        value={configuration[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                      >
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        className="w-full border rounded-lg p-2"
                        placeholder={field.placeholder}
                        value={configuration[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              {currentStep === 1 && (
                <Alert>
                  <Server className="h-4 w-4" />
                  <AlertTitle>System Requirements</AlertTitle>
                  <AlertDescription>
                    <SystemRequirements />
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between pt-4">
                <button
                  onClick={handleBack}
                  className={`px-4 py-2 rounded-lg border ${
                    currentStep === 1
                      ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                  disabled={currentStep === 1}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  {currentStep === steps.length ? 'Initialize Project' : 'Next'}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupView;