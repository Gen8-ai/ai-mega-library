# TypeScript React Components Guide

## 📁 Component Structure Map
```
[Component Architecture]
+------------------------------------------+
|            Base Components                |
|  ├─ Atoms (basic building blocks)         |
|  ├─ Molecules (composite components)      |
|  └─ Organisms (complex components)        |
+------------------------------------------+
```

## 🧱 Basic Component Examples

### ⚛️ Functional Component
```typescript
// [Button Component]
// Location: src/components/atoms/Button.tsx
interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-4 py-2 rounded-lg
      ${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
    `}
  >
    {label}
  </button>
);
```

### 🎨 Styled Component with State
```typescript
// [Input Field Component]
// Location: src/components/atoms/Input.tsx
interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`
          px-3 py-2 rounded-md border
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${isFocused ? 'ring-2 ring-blue-500' : ''}
        `}
      />
      {error && (
        <span className="text-red-500 text-xs">
          {error}
        </span>
      )}
    </div>
  );
};
```

## 🔄 Component with Hooks
```typescript
// [Counter Component]
// Location: src/components/molecules/Counter.tsx
interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  min = 0,
  max = 100
}) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(prev => Math.min(prev + 1, max));
  };

  const decrement = () => {
    setCount(prev => Math.max(prev - 1, min));
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <button
        onClick={decrement}
        disabled={count === min}
        className="px-3 py-1 bg-gray-200 rounded-lg"
      >
        -
      </button>
      <span className="text-xl font-bold">{count}</span>
      <button
        onClick={increment}
        disabled={count === max}
        className="px-3 py-1 bg-gray-200 rounded-lg"
      >
        +
      </button>
    </div>
  );
};
```

## 📋 Form Component Example
```typescript
// [Form Component]
// Location: src/components/organisms/Form.tsx
interface FormData {
  username: string;
  email: string;
  password: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email address';
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Username"
        value={formData.username}
        onChange={(value) => setFormData({...formData, username: value})}
        error={errors.username}
      />
      <Input
        label="Email"
        value={formData.email}
        onChange={(value) => setFormData({...formData, email: value})}
        error={errors.email}
      />
      <Input
        label="Password"
        value={formData.password}
        onChange={(value) => setFormData({...formData, password: value})}
        error={errors.password}
      />
      <Button label="Submit" variant="primary" />
    </form>
  );
};
```

## 🔄 Custom Hook Example
```typescript
// [useLocalStorage Hook]
// Location: src/hooks/useLocalStorage.ts
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

## 📝 Best Practices
```
[Component Guidelines]
+------------------------------------------+
| ✓ Use TypeScript interfaces for props     |
| ✓ Implement proper error handling         |
| ✓ Include proper type annotations         |
| ✓ Follow consistent naming conventions    |
| ✓ Use functional components with hooks    |
| ✓ Maintain single responsibility          |
| ✓ Document complex logic                  |
+------------------------------------------+
```

## 🔍 Type Utilities
```typescript
// Common type utilities
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Prop type utilities
type ComponentWithChildren<P = {}> = React.FC<P & { children: React.ReactNode }>;
type ComponentWithoutChildren<P = {}> = React.FC<P>;
```

For more examples and best practices, refer to the project documentation in `/docs/components/`.
