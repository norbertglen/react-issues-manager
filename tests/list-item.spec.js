/**
 * @jest-environment jsdom
 */
import React from 'react';
import {fireEvent} from '@testing-library/react';
import { render, screen } from "./utils";
import data from './data.json'
import IssueItem from '../features/issues/issue-list-item';

describe("IssueItem", () => {
    it('should display edit issue form on edit button click', async () => {
        render(<IssueItem issue={data[0]} />, { localQueries: {}});

        expect(await screen.findByText(/Edit/i)).toBeTruthy()
            
        fireEvent.click(await screen.findByText(/Edit/i));

        const titleInput = await screen.getByRole('input')
        const statusSelectInput = await screen.getByRole('select')
        const cancelButton = await screen.findByText(/Cancel/i)
        const compHeading = await screen.findByText(/Editing Issue #285/i)
      
        expect(cancelButton).toBeTruthy()
        expect(compHeading).toBeTruthy()
        expect(titleInput.value).toBe(data[0].title);
        expect(statusSelectInput.value).toBe(data[0].state);
      });
})
