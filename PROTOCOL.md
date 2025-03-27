# Development Protocol

## Code Organization

1. Use the feature-based folder structure
2. Keep components reusable when possible
3. Follow naming conventions:
   - Components: PascalCase
   - Files: PascalCase for components, camelCase for utilities
   - Variables: camelCase
   - Constants: UPPER_SNAKE_CASE

## Component Structure

1. Client components should be separated from server components
2. Use proper typing for all props and data
3. Follow clean code principles:
   - Single responsibility
   - DRY (Don't Repeat Yourself)
   - KISS (Keep It Simple, Stupid)

## State Management

1. Use React hooks for local state
2. Use URL parameters for search, filter, and pagination state
3. Implement proper error handling

## Styling

1. Use Tailwind CSS for styling
2. Follow the existing UI design system

## API Integration

1. Use the apiCaller utility for API requests
2. Handle loading and error states properly
3. Implement proper data validation

## Testing

1. Test all components before submission
2. Ensure responsive design works on all screen sizes
