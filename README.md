# useUndoRedo Hook Documentation

This is the README file for the `useUndoRedo` custom React hook. This hook allows you to implement undo/redo functionality for state changes in your React components.

## Installation

This hook is assumed to be a part of a larger library or project. Make sure you have the project or library installed and import the hook as shown in the code above.

## Usage

```jsx
import { useUndoRedo } from '[path_to_hook]';

function MyComponent() {
    const { 
      document, 
      setDocument, 
      undo, 
      redo, 
      store 
    } = useUndoRedo(initialState);
    
    // ...
}
```

## API

### `useUndoRedo<T>(initialState: T)`

This is the hook function. It should be called with an initial state as a parameter. The state can be of any type `T`.

#### Parameters:

- `initialState: T` - The initial state of the document. This can be any data type.

#### Returns:

An object containing the following properties:

- `document: T` - Represents the current state of the document.

- `setDocument(s: T): void` - Function to update the state of the document. Accepts the new state as a parameter.

- `undo(): void` - Function to undo the last change to the document. If there are no changes to undo, it does nothing.

- `redo(): void` - Function to redo a change that has been undone. If there are no changes to redo, it does nothing.

- `store(): void` - Function to store the current state of the document in the undo stack and reset the redo stack. This should be called after changes that you want to be undoable/redoable.

## Example

```jsx
import React from 'react';
import { useUndoRedo } from '[path_to_hook]';

const NoteEditor = () => {
    const { document, setDocument, undo, redo, store } = useUndoRedo("");

    const handleChange = (event) => {
        setDocument(event.target.value);
        store();
    };

    return (
        <div>
            <textarea value={document} onChange={handleChange} />
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
        </div>
    );
};

export default NoteEditor;
```

In this example, the `NoteEditor` component has a textarea which content can be undone and redone. The `useUndoRedo` hook is used to manage the state of the textarea’s content. The current state of the content is stored in the `document` variable. When the content changes, `setDocument` is called to update the state, and `store` is called to make this change undoable/redoable. The `undo` and `redo` functions are connected to buttons that allow the user to undo or redo changes to the content.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request on the repository where this hook is hosted.

## License

This hook is usually under the license of the library or project it is part of. Check the project’s license document for more details.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started With Vercel Prject

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
