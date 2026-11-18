// 1. Execute the unminified source code file
import './ravelin-bundle.js';

// 2. Safe extraction from the window object
const Ravelin = typeof window !== 'undefined' ? window.Ravelin : null;

// 3. Clean ESM export for your SDK to consume
export default Ravelin;