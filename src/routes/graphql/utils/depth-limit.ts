import depthLimit from 'graphql-depth-limit';
import type { ValidationRule } from 'graphql';

export const depthLimitRule: ValidationRule = depthLimit(5) as ValidationRule;
