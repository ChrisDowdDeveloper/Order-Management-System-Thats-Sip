# Order Management System for That's Sip

## Introduction

The Order Management System is specifically designed for the business "That's Sip." It provides a comprehensive list of items used in the store, focusing on cutting down order inaccuracies and ensuring that only the items used are ordered from Webstaurant. The store's issue of mismatched lids and cups is efficiently tackled with this system.

## Purpose

The primary aim of this project is to minimize errors in orders, particularly with items like lids that may not always match the corresponding cups. By ensuring accuracy in the orders, the system contributes to smoother and more efficient operations at "That's Sip."

## Installation

To install the project, follow these steps:

1. Navigate to the root folder.
2. Run `npm run install:all`.

To run the project, you must navigate to both the "backend" and "client" subfolders and run `npm start` in both.

## API Endpoints

The application uses the following endpoints:

- `/`: This route handles the listing of items, creating new items, and creating the order that runs the puppeteer bot.
- `/:item_id`: This route handles the deletion of items that are no longer used.

## Database Schema

The database schema for the project is defined as follows:

```sql
return knex.schema.createTable("items", (table) => {
    table.increments("item_id").primary();
    table.string("item_name");
    table.string("item_url");
    table.string("item_jpg");
    table.integer("item_control");
    table.string("item_type");
});
