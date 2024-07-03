
import { render, screen } from '@testing-library/react';
import { it, expect, } from 'vitest';

import App from './App';


it('App is rendered without issues ', () => {
    render(<App />);
    const header = screen.getByText(/Chart/);
    expect(header).toBeInTheDocument();
});


