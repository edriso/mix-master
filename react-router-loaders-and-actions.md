# React Router: Loaders, Actions & Form

## Loader — Fetch Data Before Rendering

A `loader` runs **before** a route's component renders. This means the data is ready by the time the component mounts — no `useEffect` + `useState` combo needed.

### Define the loader

```jsx
// pages/Landing.jsx
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

export const loader = async () => {
  const response = await axios.get(url);
  return { drinks: response.data.drinks || [] };
};
```

### Register it in the router

```jsx
// App.jsx
import { loader as landingLoader } from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    loader: landingLoader,
  },
]);
```

### Use the data in the component

```jsx
const Landing = () => {
  const { drinks } = useLoaderData();

  return (
    <ul>
      {drinks.map((drink) => (
        <li key={drink.idDrink}>{drink.strDrink}</li>
      ))}
    </ul>
  );
};
```

No loading state, no `useEffect` — the component only renders once the data is available.

---

## Action — Handle Form Submissions

An `action` handles **POST/PUT/PATCH/DELETE** requests on a route. It replaces the traditional `handleSubmit` + `e.preventDefault()` pattern.

### The old way (manual handleSubmit)

```jsx
const Newsletter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/newsletter', { name, email });
      // handle success
    } catch (error) {
      // handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### The new way (React Router action + Form)

#### 1. Define the action

```jsx
// pages/Newsletter.jsx
import { Form, redirect } from 'react-router-dom';
import axios from 'axios';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // data = { name: '...', email: '...' }

  await axios.post('/api/newsletter', data);
  return redirect('/');
};
```

#### 2. Register it in the router

```jsx
import { action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: '/newsletter',
    element: <Newsletter />,
    action: newsletterAction,
  },
]);
```

#### 3. Use `Form` instead of `form`

```jsx
const Newsletter = () => {
  return (
    <Form method="POST">
      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <button type="submit">Submit</button>
    </Form>
  );
};
```

That's it. No `useState`, no `onChange`, no `handleSubmit`, no `e.preventDefault()`. React Router's `Form` component intercepts the submission and sends it to the route's `action`.

---

## Submission State with `useNavigation`

You can track whether a form is currently submitting:

```jsx
import { Form, useNavigation } from 'react-router-dom';

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="POST">
      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </Form>
  );
};
```

---

## Quick Summary

| Concept | Purpose | Replaces |
|---------|---------|----------|
| `loader` | Fetch data before a page renders | `useEffect` + `useState` for fetching |
| `action` | Handle form submissions (POST, etc.) | `handleSubmit` + `e.preventDefault()` |
| `Form` | React Router's form component that triggers the `action` | Regular `<form>` with `onSubmit` |
| `useLoaderData` | Access data returned by the `loader` | State variables holding fetched data |
| `useNavigation` | Track loading/submitting state | Manual loading state with `useState` |
