const sum = (a: number, b: number) => a + b

describe('sum()', () => {
    it('should return 5 if given 2 and 3 ', () => {
        expect(sum(2, 3)).toBe(5)
    })
})


/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByText('Next.js!')

        expect(heading).toBeInTheDocument()
    })
})