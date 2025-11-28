import React from 'react';
import CodeBlock from '../../components/CodeBlock/CodeBlock';

const GettingStartedWithReactHooks = () => {
  return (
    <>
      <p>
        React Hooks revolutionized how we write React components. Introduced in React 16.8, 
        they allow you to use state and other React features without writing a class. 
        In this guide, we'll explore the most commonly used hooks and how to create your own.
      </p>

      <h2>What are React Hooks?</h2>
      <p>
        Hooks are functions that let you "hook into" React state and lifecycle features from 
        function components. They don't work inside classes — they let you use React without classes.
      </p>

      <blockquote>
        <p>
          "Hooks let you split one component into smaller functions based on what pieces are 
          related (such as setting up a subscription or fetching data)."
        </p>
      </blockquote>

      <h2>useState: Managing State</h2>
      <p>
        The <code>useState</code> hook lets you add state to functional components. It returns an array 
        with two elements: the current state value and a function to update it.
      </p>

      <CodeBlock
        language="javascript"
        filename="Counter.jsx"
        code={`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}
      />

      <h3>Key Points About useState</h3>
      <ul>
        <li>You can call <code>useState</code> multiple times in a single component</li>
        <li>The initial state is only used during the first render</li>
        <li>State updates may be batched for performance</li>
        <li>Unlike <code>this.setState</code>, updating state always replaces it instead of merging</li>
      </ul>

      <h2>useEffect: Handling Side Effects</h2>
      <p>
        The <code>useEffect</code> hook lets you perform side effects in function components. 
        It serves the same purpose as <code>componentDidMount</code>, <code>componentDidUpdate</code>, 
        and <code>componentWillUnmount</code> combined.
      </p>

      <CodeBlock
        language="javascript"
        filename="DataFetcher.jsx"
        code={`import React, { useState, useEffect } from 'react';

function DataFetcher({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs after every render where userId changes
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }

    fetchUser();

    // Cleanup function (optional)
    return () => {
      // Cancel any pending requests here
    };
  }, [userId]); // Only re-run if userId changes

  if (loading) return <div>Loading...</div>;
  return <div>Hello, {user.name}!</div>;
}`}
      />

      <h2>useContext: Sharing State</h2>
      <p>
        The <code>useContext</code> hook provides a way to pass data through the component tree 
        without having to pass props down manually at every level.
      </p>

      <CodeBlock
        language="javascript"
        filename="ThemeContext.jsx"
        code={`import React, { useContext, createContext, useState } from 'react';

// Create a context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component using useContext
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
      }}
    >
      Toggle Theme
    </button>
  );
}`}
      />

      <h2>Creating Custom Hooks</h2>
      <p>
        Custom hooks let you extract component logic into reusable functions. 
        A custom hook is a JavaScript function whose name starts with "use" and that may call other hooks.
      </p>

      <CodeBlock
        language="javascript"
        filename="useLocalStorage.js"
        code={`import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get stored value or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'Guest');

  return (
    <input
      value={name}
      onChange={e => setName(e.target.value)}
    />
  );
}`}
      />

      <h2>Rules of Hooks</h2>
      <p>
        Hooks are JavaScript functions, but they have two important rules:
      </p>
      <ol>
        <li>
          <strong>Only Call Hooks at the Top Level</strong> — Don't call hooks inside loops, 
          conditions, or nested functions.
        </li>
        <li>
          <strong>Only Call Hooks from React Functions</strong> — Call them from React function 
          components or custom hooks.
        </li>
      </ol>

      <h2>Conclusion</h2>
      <p>
        React Hooks provide a more direct API to React concepts you already know: props, state, 
        context, refs, and lifecycle. They don't fundamentally change how React works, but they 
        do make it easier to reuse logic and write cleaner code.
      </p>
      <p>
        Start by converting a simple class component to use hooks, and gradually adopt them 
        in your codebase. Remember, you don't have to convert all your existing code — 
        hooks work alongside classes!
      </p>
    </>
  );
};

export default GettingStartedWithReactHooks;
