export type NCDifficulty = 'easy' | 'medium' | 'hard'

export interface NCProblem {
  id: string
  title: string
  lcId: number
  difficulty: NCDifficulty
  pattern: string
  topics: string[]
  patternOrder: number   // order within the pattern (for progression)
  patternIndex: number  // which pattern group (for prerequisite logic)
  url: string
}

// Patterns ordered by recommended learning progression
export const PATTERN_ORDER = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Trees',
  'Tries',
  'Heap / Priority Queue',
  'Backtracking',
  'Graphs',
  'Advanced Graphs',
  '1-D DP',
  '2-D DP',
  'Greedy',
  'Intervals',
  'Math & Geometry',
  'Bit Manipulation',
]

export const NEETCODE_150: NCProblem[] = [
  // Arrays & Hashing (index 0)
  { id: 'nc-contains-duplicate', lcId: 217, title: 'Contains Duplicate', difficulty: 'easy', pattern: 'Arrays & Hashing', topics: ['arrays', 'hashmap'], patternOrder: 1, patternIndex: 0, url: 'https://leetcode.com/problems/contains-duplicate/' },
  { id: 'nc-valid-anagram', lcId: 242, title: 'Valid Anagram', difficulty: 'easy', pattern: 'Arrays & Hashing', topics: ['arrays', 'hashmap'], patternOrder: 2, patternIndex: 0, url: 'https://leetcode.com/problems/valid-anagram/' },
  { id: 'nc-two-sum', lcId: 1, title: 'Two Sum', difficulty: 'easy', pattern: 'Arrays & Hashing', topics: ['arrays', 'hashmap'], patternOrder: 3, patternIndex: 0, url: 'https://leetcode.com/problems/two-sum/' },
  { id: 'nc-group-anagrams', lcId: 49, title: 'Group Anagrams', difficulty: 'medium', pattern: 'Arrays & Hashing', topics: ['arrays', 'hashmap', 'sorting'], patternOrder: 4, patternIndex: 0, url: 'https://leetcode.com/problems/group-anagrams/' },
  { id: 'nc-top-k-frequent', lcId: 347, title: 'Top K Frequent Elements', difficulty: 'medium', pattern: 'Arrays & Hashing', topics: ['arrays', 'hashmap', 'bucket-sort'], patternOrder: 5, patternIndex: 0, url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
  { id: 'nc-encode-decode', lcId: 271, title: 'Encode and Decode Strings', difficulty: 'medium', pattern: 'Arrays & Hashing', topics: ['arrays', 'strings'], patternOrder: 6, patternIndex: 0, url: 'https://leetcode.com/problems/encode-and-decode-strings/' },
  { id: 'nc-product-except-self', lcId: 238, title: 'Product of Array Except Self', difficulty: 'medium', pattern: 'Arrays & Hashing', topics: ['arrays', 'prefix-sum'], patternOrder: 7, patternIndex: 0, url: 'https://leetcode.com/problems/product-of-array-except-self/' },
  { id: 'nc-valid-sudoku', lcId: 36, title: 'Valid Sudoku', difficulty: 'medium', pattern: 'Arrays & Hashing', topics: ['arrays', 'hashmap', 'matrix'], patternOrder: 8, patternIndex: 0, url: 'https://leetcode.com/problems/valid-sudoku/' },
  { id: 'nc-longest-consecutive', lcId: 128, title: 'Longest Consecutive Sequence', difficulty: 'medium', pattern: 'Arrays & Hashing', topics: ['arrays', 'hashmap'], patternOrder: 9, patternIndex: 0, url: 'https://leetcode.com/problems/longest-consecutive-sequence/' },

  // Two Pointers (index 1)
  { id: 'nc-valid-palindrome', lcId: 125, title: 'Valid Palindrome', difficulty: 'easy', pattern: 'Two Pointers', topics: ['two-pointers', 'strings'], patternOrder: 1, patternIndex: 1, url: 'https://leetcode.com/problems/valid-palindrome/' },
  { id: 'nc-two-sum-ii', lcId: 167, title: 'Two Sum II', difficulty: 'medium', pattern: 'Two Pointers', topics: ['two-pointers', 'arrays', 'binary-search'], patternOrder: 2, patternIndex: 1, url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
  { id: 'nc-3sum', lcId: 15, title: '3Sum', difficulty: 'medium', pattern: 'Two Pointers', topics: ['two-pointers', 'arrays', 'sorting'], patternOrder: 3, patternIndex: 1, url: 'https://leetcode.com/problems/3sum/' },
  { id: 'nc-container-most-water', lcId: 11, title: 'Container With Most Water', difficulty: 'medium', pattern: 'Two Pointers', topics: ['two-pointers', 'arrays', 'greedy'], patternOrder: 4, patternIndex: 1, url: 'https://leetcode.com/problems/container-with-most-water/' },
  { id: 'nc-trapping-rain', lcId: 42, title: 'Trapping Rain Water', difficulty: 'hard', pattern: 'Two Pointers', topics: ['two-pointers', 'arrays', 'dp'], patternOrder: 5, patternIndex: 1, url: 'https://leetcode.com/problems/trapping-rain-water/' },

  // Sliding Window (index 2)
  { id: 'nc-best-time-stock', lcId: 121, title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', pattern: 'Sliding Window', topics: ['sliding-window', 'arrays', 'dp'], patternOrder: 1, patternIndex: 2, url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
  { id: 'nc-longest-substring', lcId: 3, title: 'Longest Substring Without Repeating', difficulty: 'medium', pattern: 'Sliding Window', topics: ['sliding-window', 'hashmap', 'strings'], patternOrder: 2, patternIndex: 2, url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  { id: 'nc-longest-repeating-char', lcId: 424, title: 'Longest Repeating Character Replacement', difficulty: 'medium', pattern: 'Sliding Window', topics: ['sliding-window', 'strings', 'hashmap'], patternOrder: 3, patternIndex: 2, url: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
  { id: 'nc-permutation-in-string', lcId: 567, title: 'Permutation in String', difficulty: 'medium', pattern: 'Sliding Window', topics: ['sliding-window', 'hashmap', 'strings', 'two-pointers'], patternOrder: 4, patternIndex: 2, url: 'https://leetcode.com/problems/permutation-in-string/' },
  { id: 'nc-min-window-substring', lcId: 76, title: 'Minimum Window Substring', difficulty: 'hard', pattern: 'Sliding Window', topics: ['sliding-window', 'hashmap', 'strings', 'two-pointers'], patternOrder: 5, patternIndex: 2, url: 'https://leetcode.com/problems/minimum-window-substring/' },
  { id: 'nc-sliding-window-max', lcId: 239, title: 'Sliding Window Maximum', difficulty: 'hard', pattern: 'Sliding Window', topics: ['sliding-window', 'deque', 'arrays'], patternOrder: 6, patternIndex: 2, url: 'https://leetcode.com/problems/sliding-window-maximum/' },

  // Stack (index 3)
  { id: 'nc-valid-parentheses', lcId: 20, title: 'Valid Parentheses', difficulty: 'easy', pattern: 'Stack', topics: ['stack', 'strings'], patternOrder: 1, patternIndex: 3, url: 'https://leetcode.com/problems/valid-parentheses/' },
  { id: 'nc-min-stack', lcId: 155, title: 'Min Stack', difficulty: 'medium', pattern: 'Stack', topics: ['stack', 'design'], patternOrder: 2, patternIndex: 3, url: 'https://leetcode.com/problems/min-stack/' },
  { id: 'nc-evaluate-rpn', lcId: 150, title: 'Evaluate Reverse Polish Notation', difficulty: 'medium', pattern: 'Stack', topics: ['stack', 'math'], patternOrder: 3, patternIndex: 3, url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
  { id: 'nc-generate-parentheses', lcId: 22, title: 'Generate Parentheses', difficulty: 'medium', pattern: 'Stack', topics: ['stack', 'backtracking', 'strings'], patternOrder: 4, patternIndex: 3, url: 'https://leetcode.com/problems/generate-parentheses/' },
  { id: 'nc-daily-temperatures', lcId: 739, title: 'Daily Temperatures', difficulty: 'medium', pattern: 'Stack', topics: ['stack', 'monotonic-stack', 'arrays'], patternOrder: 5, patternIndex: 3, url: 'https://leetcode.com/problems/daily-temperatures/' },
  { id: 'nc-car-fleet', lcId: 853, title: 'Car Fleet', difficulty: 'medium', pattern: 'Stack', topics: ['stack', 'monotonic-stack', 'sorting'], patternOrder: 6, patternIndex: 3, url: 'https://leetcode.com/problems/car-fleet/' },
  { id: 'nc-largest-rectangle', lcId: 84, title: 'Largest Rectangle in Histogram', difficulty: 'hard', pattern: 'Stack', topics: ['stack', 'monotonic-stack', 'arrays'], patternOrder: 7, patternIndex: 3, url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },

  // Binary Search (index 4)
  { id: 'nc-binary-search', lcId: 704, title: 'Binary Search', difficulty: 'easy', pattern: 'Binary Search', topics: ['binary-search', 'arrays'], patternOrder: 1, patternIndex: 4, url: 'https://leetcode.com/problems/binary-search/' },
  { id: 'nc-search-2d-matrix', lcId: 74, title: 'Search a 2D Matrix', difficulty: 'medium', pattern: 'Binary Search', topics: ['binary-search', 'matrix'], patternOrder: 2, patternIndex: 4, url: 'https://leetcode.com/problems/search-a-2d-matrix/' },
  { id: 'nc-koko-eating', lcId: 875, title: 'Koko Eating Bananas', difficulty: 'medium', pattern: 'Binary Search', topics: ['binary-search', 'arrays'], patternOrder: 3, patternIndex: 4, url: 'https://leetcode.com/problems/koko-eating-bananas/' },
  { id: 'nc-find-min-rotated', lcId: 153, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'medium', pattern: 'Binary Search', topics: ['binary-search', 'arrays'], patternOrder: 4, patternIndex: 4, url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
  { id: 'nc-search-rotated', lcId: 33, title: 'Search in Rotated Sorted Array', difficulty: 'medium', pattern: 'Binary Search', topics: ['binary-search', 'arrays'], patternOrder: 5, patternIndex: 4, url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
  { id: 'nc-time-based-kv', lcId: 981, title: 'Time Based Key-Value Store', difficulty: 'medium', pattern: 'Binary Search', topics: ['binary-search', 'hashmap', 'design'], patternOrder: 6, patternIndex: 4, url: 'https://leetcode.com/problems/time-based-key-value-store/' },
  { id: 'nc-median-two-arrays', lcId: 4, title: 'Median of Two Sorted Arrays', difficulty: 'hard', pattern: 'Binary Search', topics: ['binary-search', 'arrays', 'divide-and-conquer'], patternOrder: 7, patternIndex: 4, url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },

  // Linked List (index 5)
  { id: 'nc-reverse-linked-list', lcId: 206, title: 'Reverse Linked List', difficulty: 'easy', pattern: 'Linked List', topics: ['linked-list', 'recursion'], patternOrder: 1, patternIndex: 5, url: 'https://leetcode.com/problems/reverse-linked-list/' },
  { id: 'nc-merge-two-lists', lcId: 21, title: 'Merge Two Sorted Lists', difficulty: 'easy', pattern: 'Linked List', topics: ['linked-list', 'recursion'], patternOrder: 2, patternIndex: 5, url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
  { id: 'nc-reorder-list', lcId: 143, title: 'Reorder List', difficulty: 'medium', pattern: 'Linked List', topics: ['linked-list', 'two-pointers', 'recursion'], patternOrder: 3, patternIndex: 5, url: 'https://leetcode.com/problems/reorder-list/' },
  { id: 'nc-remove-nth-end', lcId: 19, title: 'Remove Nth Node From End of List', difficulty: 'medium', pattern: 'Linked List', topics: ['linked-list', 'two-pointers'], patternOrder: 4, patternIndex: 5, url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
  { id: 'nc-copy-list-random', lcId: 138, title: 'Copy List with Random Pointer', difficulty: 'medium', pattern: 'Linked List', topics: ['linked-list', 'hashmap'], patternOrder: 5, patternIndex: 5, url: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
  { id: 'nc-add-two-numbers', lcId: 2, title: 'Add Two Numbers', difficulty: 'medium', pattern: 'Linked List', topics: ['linked-list', 'math', 'recursion'], patternOrder: 6, patternIndex: 5, url: 'https://leetcode.com/problems/add-two-numbers/' },
  { id: 'nc-linked-list-cycle', lcId: 141, title: 'Linked List Cycle', difficulty: 'easy', pattern: 'Linked List', topics: ['linked-list', 'two-pointers', 'fast-slow-pointer'], patternOrder: 7, patternIndex: 5, url: 'https://leetcode.com/problems/linked-list-cycle/' },
  { id: 'nc-find-duplicate', lcId: 287, title: 'Find the Duplicate Number', difficulty: 'medium', pattern: 'Linked List', topics: ['linked-list', 'two-pointers', 'fast-slow-pointer', 'binary-search'], patternOrder: 8, patternIndex: 5, url: 'https://leetcode.com/problems/find-the-duplicate-number/' },
  { id: 'nc-lru-cache', lcId: 146, title: 'LRU Cache', difficulty: 'medium', pattern: 'Linked List', topics: ['linked-list', 'hashmap', 'design', 'doubly-linked-list'], patternOrder: 9, patternIndex: 5, url: 'https://leetcode.com/problems/lru-cache/' },
  { id: 'nc-merge-k-sorted', lcId: 23, title: 'Merge k Sorted Lists', difficulty: 'hard', pattern: 'Linked List', topics: ['linked-list', 'heap', 'divide-and-conquer'], patternOrder: 10, patternIndex: 5, url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
  { id: 'nc-reverse-nodes-k', lcId: 25, title: 'Reverse Nodes in k-Group', difficulty: 'hard', pattern: 'Linked List', topics: ['linked-list', 'recursion'], patternOrder: 11, patternIndex: 5, url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },

  // Trees (index 6)
  { id: 'nc-invert-tree', lcId: 226, title: 'Invert Binary Tree', difficulty: 'easy', pattern: 'Trees', topics: ['trees', 'dfs', 'bfs', 'recursion'], patternOrder: 1, patternIndex: 6, url: 'https://leetcode.com/problems/invert-binary-tree/' },
  { id: 'nc-max-depth-tree', lcId: 104, title: 'Maximum Depth of Binary Tree', difficulty: 'easy', pattern: 'Trees', topics: ['trees', 'dfs', 'bfs', 'recursion'], patternOrder: 2, patternIndex: 6, url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
  { id: 'nc-diameter-tree', lcId: 543, title: 'Diameter of Binary Tree', difficulty: 'easy', pattern: 'Trees', topics: ['trees', 'dfs', 'recursion'], patternOrder: 3, patternIndex: 6, url: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
  { id: 'nc-balanced-tree', lcId: 110, title: 'Balanced Binary Tree', difficulty: 'easy', pattern: 'Trees', topics: ['trees', 'dfs', 'recursion'], patternOrder: 4, patternIndex: 6, url: 'https://leetcode.com/problems/balanced-binary-tree/' },
  { id: 'nc-same-tree', lcId: 100, title: 'Same Tree', difficulty: 'easy', pattern: 'Trees', topics: ['trees', 'dfs', 'bfs', 'recursion'], patternOrder: 5, patternIndex: 6, url: 'https://leetcode.com/problems/same-tree/' },
  { id: 'nc-subtree-of-another', lcId: 572, title: 'Subtree of Another Tree', difficulty: 'easy', pattern: 'Trees', topics: ['trees', 'dfs', 'recursion', 'hashing'], patternOrder: 6, patternIndex: 6, url: 'https://leetcode.com/problems/subtree-of-another-tree/' },
  { id: 'nc-lca-bst', lcId: 235, title: 'Lowest Common Ancestor of BST', difficulty: 'medium', pattern: 'Trees', topics: ['trees', 'dfs', 'bst', 'recursion'], patternOrder: 7, patternIndex: 6, url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
  { id: 'nc-level-order', lcId: 102, title: 'Binary Tree Level Order Traversal', difficulty: 'medium', pattern: 'Trees', topics: ['trees', 'bfs'], patternOrder: 8, patternIndex: 6, url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
  { id: 'nc-right-side-view', lcId: 199, title: 'Binary Tree Right Side View', difficulty: 'medium', pattern: 'Trees', topics: ['trees', 'bfs', 'dfs'], patternOrder: 9, patternIndex: 6, url: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
  { id: 'nc-count-good-nodes', lcId: 1448, title: 'Count Good Nodes in Binary Tree', difficulty: 'medium', pattern: 'Trees', topics: ['trees', 'dfs'], patternOrder: 10, patternIndex: 6, url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/' },
  { id: 'nc-validate-bst', lcId: 98, title: 'Validate Binary Search Tree', difficulty: 'medium', pattern: 'Trees', topics: ['trees', 'dfs', 'bst', 'recursion'], patternOrder: 11, patternIndex: 6, url: 'https://leetcode.com/problems/validate-binary-search-tree/' },
  { id: 'nc-kth-smallest-bst', lcId: 230, title: 'Kth Smallest Element in BST', difficulty: 'medium', pattern: 'Trees', topics: ['trees', 'dfs', 'bst', 'inorder'], patternOrder: 12, patternIndex: 6, url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
  { id: 'nc-construct-from-preorder', lcId: 105, title: 'Construct Tree from Preorder/Inorder', difficulty: 'medium', pattern: 'Trees', topics: ['trees', 'arrays', 'hashmap', 'divide-and-conquer'], patternOrder: 13, patternIndex: 6, url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
  { id: 'nc-max-path-sum', lcId: 124, title: 'Binary Tree Maximum Path Sum', difficulty: 'hard', pattern: 'Trees', topics: ['trees', 'dfs', 'dp', 'recursion'], patternOrder: 14, patternIndex: 6, url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
  { id: 'nc-serialize-deserialize', lcId: 297, title: 'Serialize and Deserialize Binary Tree', difficulty: 'hard', pattern: 'Trees', topics: ['trees', 'dfs', 'bfs', 'design', 'strings'], patternOrder: 15, patternIndex: 6, url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },

  // Tries (index 7)
  { id: 'nc-implement-trie', lcId: 208, title: 'Implement Trie', difficulty: 'medium', pattern: 'Tries', topics: ['trie', 'design', 'strings'], patternOrder: 1, patternIndex: 7, url: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
  { id: 'nc-design-add-search', lcId: 211, title: 'Design Add and Search Words', difficulty: 'medium', pattern: 'Tries', topics: ['trie', 'dfs', 'design', 'strings'], patternOrder: 2, patternIndex: 7, url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
  { id: 'nc-word-search-ii', lcId: 212, title: 'Word Search II', difficulty: 'hard', pattern: 'Tries', topics: ['trie', 'backtracking', 'matrix', 'dfs'], patternOrder: 3, patternIndex: 7, url: 'https://leetcode.com/problems/word-search-ii/' },

  // Heap / Priority Queue (index 8)
  { id: 'nc-kth-largest', lcId: 703, title: 'Kth Largest Element in Stream', difficulty: 'easy', pattern: 'Heap / Priority Queue', topics: ['heap', 'design', 'binary-search', 'data-stream'], patternOrder: 1, patternIndex: 8, url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
  { id: 'nc-last-stone-weight', lcId: 1046, title: 'Last Stone Weight', difficulty: 'easy', pattern: 'Heap / Priority Queue', topics: ['heap', 'arrays'], patternOrder: 2, patternIndex: 8, url: 'https://leetcode.com/problems/last-stone-weight/' },
  { id: 'nc-k-closest-points', lcId: 973, title: 'K Closest Points to Origin', difficulty: 'medium', pattern: 'Heap / Priority Queue', topics: ['heap', 'arrays', 'math', 'divide-and-conquer'], patternOrder: 3, patternIndex: 8, url: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
  { id: 'nc-kth-largest-array', lcId: 215, title: 'Kth Largest Element in Array', difficulty: 'medium', pattern: 'Heap / Priority Queue', topics: ['heap', 'arrays', 'quickselect', 'sorting'], patternOrder: 4, patternIndex: 8, url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
  { id: 'nc-task-scheduler', lcId: 621, title: 'Task Scheduler', difficulty: 'medium', pattern: 'Heap / Priority Queue', topics: ['heap', 'arrays', 'greedy', 'hashmap'], patternOrder: 5, patternIndex: 8, url: 'https://leetcode.com/problems/task-scheduler/' },
  { id: 'nc-design-twitter', lcId: 355, title: 'Design Twitter', difficulty: 'medium', pattern: 'Heap / Priority Queue', topics: ['heap', 'hashmap', 'linked-list', 'design'], patternOrder: 6, patternIndex: 8, url: 'https://leetcode.com/problems/design-twitter/' },
  { id: 'nc-find-median-stream', lcId: 295, title: 'Find Median from Data Stream', difficulty: 'hard', pattern: 'Heap / Priority Queue', topics: ['heap', 'two-heaps', 'design', 'data-stream', 'sorting'], patternOrder: 7, patternIndex: 8, url: 'https://leetcode.com/problems/find-median-from-data-stream/' },

  // Backtracking (index 9)
  { id: 'nc-subsets', lcId: 78, title: 'Subsets', difficulty: 'medium', pattern: 'Backtracking', topics: ['backtracking', 'arrays', 'bit-manipulation'], patternOrder: 1, patternIndex: 9, url: 'https://leetcode.com/problems/subsets/' },
  { id: 'nc-combination-sum', lcId: 39, title: 'Combination Sum', difficulty: 'medium', pattern: 'Backtracking', topics: ['backtracking', 'arrays'], patternOrder: 2, patternIndex: 9, url: 'https://leetcode.com/problems/combination-sum/' },
  { id: 'nc-permutations', lcId: 46, title: 'Permutations', difficulty: 'medium', pattern: 'Backtracking', topics: ['backtracking', 'arrays'], patternOrder: 3, patternIndex: 9, url: 'https://leetcode.com/problems/permutations/' },
  { id: 'nc-subsets-ii', lcId: 90, title: 'Subsets II', difficulty: 'medium', pattern: 'Backtracking', topics: ['backtracking', 'arrays', 'bit-manipulation'], patternOrder: 4, patternIndex: 9, url: 'https://leetcode.com/problems/subsets-ii/' },
  { id: 'nc-combination-sum-ii', lcId: 40, title: 'Combination Sum II', difficulty: 'medium', pattern: 'Backtracking', topics: ['backtracking', 'arrays'], patternOrder: 5, patternIndex: 9, url: 'https://leetcode.com/problems/combination-sum-ii/' },
  { id: 'nc-word-search', lcId: 79, title: 'Word Search', difficulty: 'medium', pattern: 'Backtracking', topics: ['backtracking', 'matrix', 'dfs'], patternOrder: 6, patternIndex: 9, url: 'https://leetcode.com/problems/word-search/' },
  { id: 'nc-palindrome-partition', lcId: 131, title: 'Palindrome Partitioning', difficulty: 'medium', pattern: 'Backtracking', topics: ['backtracking', 'strings', 'dp'], patternOrder: 7, patternIndex: 9, url: 'https://leetcode.com/problems/palindrome-partitioning/' },
  { id: 'nc-letter-combinations', lcId: 17, title: 'Letter Combinations of Phone Number', difficulty: 'medium', pattern: 'Backtracking', topics: ['backtracking', 'hashmap', 'strings'], patternOrder: 8, patternIndex: 9, url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
  { id: 'nc-n-queens', lcId: 51, title: 'N-Queens', difficulty: 'hard', pattern: 'Backtracking', topics: ['backtracking', 'arrays'], patternOrder: 9, patternIndex: 9, url: 'https://leetcode.com/problems/n-queens/' },

  // Graphs (index 10)
  { id: 'nc-num-islands', lcId: 200, title: 'Number of Islands', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'dfs', 'bfs', 'matrix', 'union-find'], patternOrder: 1, patternIndex: 10, url: 'https://leetcode.com/problems/number-of-islands/' },
  { id: 'nc-max-area-island', lcId: 695, title: 'Max Area of Island', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'dfs', 'bfs', 'matrix'], patternOrder: 2, patternIndex: 10, url: 'https://leetcode.com/problems/max-area-of-island/' },
  { id: 'nc-clone-graph', lcId: 133, title: 'Clone Graph', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'dfs', 'bfs', 'hashmap'], patternOrder: 3, patternIndex: 10, url: 'https://leetcode.com/problems/clone-graph/' },
  { id: 'nc-walls-and-gates', lcId: 286, title: 'Walls and Gates', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'bfs', 'matrix'], patternOrder: 4, patternIndex: 10, url: 'https://leetcode.com/problems/walls-and-gates/' },
  { id: 'nc-rotting-oranges', lcId: 994, title: 'Rotting Oranges', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'bfs', 'matrix'], patternOrder: 5, patternIndex: 10, url: 'https://leetcode.com/problems/rotting-oranges/' },
  { id: 'nc-pacific-atlantic', lcId: 417, title: 'Pacific Atlantic Water Flow', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'dfs', 'bfs', 'matrix'], patternOrder: 6, patternIndex: 10, url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
  { id: 'nc-surrounded-regions', lcId: 130, title: 'Surrounded Regions', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'dfs', 'bfs', 'matrix', 'union-find'], patternOrder: 7, patternIndex: 10, url: 'https://leetcode.com/problems/surrounded-regions/' },
  { id: 'nc-course-schedule', lcId: 207, title: 'Course Schedule', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'dfs', 'topological-sort', 'cycle-detection'], patternOrder: 8, patternIndex: 10, url: 'https://leetcode.com/problems/course-schedule/' },
  { id: 'nc-course-schedule-ii', lcId: 210, title: 'Course Schedule II', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'dfs', 'topological-sort'], patternOrder: 9, patternIndex: 10, url: 'https://leetcode.com/problems/course-schedule-ii/' },
  { id: 'nc-graph-valid-tree', lcId: 261, title: 'Graph Valid Tree', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'dfs', 'bfs', 'union-find'], patternOrder: 10, patternIndex: 10, url: 'https://leetcode.com/problems/graph-valid-tree/' },
  { id: 'nc-num-connected-components', lcId: 323, title: 'Number of Connected Components', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'dfs', 'union-find'], patternOrder: 11, patternIndex: 10, url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
  { id: 'nc-redundant-connection', lcId: 684, title: 'Redundant Connection', difficulty: 'medium', pattern: 'Graphs', topics: ['graphs', 'union-find', 'dfs'], patternOrder: 12, patternIndex: 10, url: 'https://leetcode.com/problems/redundant-connection/' },
  { id: 'nc-word-ladder', lcId: 127, title: 'Word Ladder', difficulty: 'hard', pattern: 'Graphs', topics: ['graphs', 'bfs', 'hashmap'], patternOrder: 13, patternIndex: 10, url: 'https://leetcode.com/problems/word-ladder/' },

  // Advanced Graphs (index 11)
  { id: 'nc-reconstruct-itinerary', lcId: 332, title: 'Reconstruct Itinerary', difficulty: 'hard', pattern: 'Advanced Graphs', topics: ['graphs', 'dfs', 'eulerian-path'], patternOrder: 1, patternIndex: 11, url: 'https://leetcode.com/problems/reconstruct-itinerary/' },
  { id: 'nc-min-cost-connect', lcId: 1584, title: 'Min Cost to Connect All Points', difficulty: 'medium', pattern: 'Advanced Graphs', topics: ['graphs', 'minimum-spanning-tree', 'prims'], patternOrder: 2, patternIndex: 11, url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
  { id: 'nc-network-delay', lcId: 743, title: 'Network Delay Time', difficulty: 'medium', pattern: 'Advanced Graphs', topics: ['graphs', 'dijkstra', 'shortest-path', 'heap'], patternOrder: 3, patternIndex: 11, url: 'https://leetcode.com/problems/network-delay-time/' },
  { id: 'nc-swim-rising-water', lcId: 778, title: 'Swim in Rising Water', difficulty: 'hard', pattern: 'Advanced Graphs', topics: ['graphs', 'dijkstra', 'binary-search', 'dfs'], patternOrder: 4, patternIndex: 11, url: 'https://leetcode.com/problems/swim-in-rising-water/' },
  { id: 'nc-alien-dictionary', lcId: 269, title: 'Alien Dictionary', difficulty: 'hard', pattern: 'Advanced Graphs', topics: ['graphs', 'topological-sort', 'dfs', 'bfs', 'strings'], patternOrder: 5, patternIndex: 11, url: 'https://leetcode.com/problems/alien-dictionary/' },
  { id: 'nc-cheapest-flights', lcId: 787, title: 'Cheapest Flights Within K Stops', difficulty: 'medium', pattern: 'Advanced Graphs', topics: ['graphs', 'bellman-ford', 'dynamic-programming', 'bfs'], patternOrder: 6, patternIndex: 11, url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },

  // 1-D DP (index 12)
  { id: 'nc-climbing-stairs', lcId: 70, title: 'Climbing Stairs', difficulty: 'easy', pattern: '1-D DP', topics: ['dp', 'math', 'memoization'], patternOrder: 1, patternIndex: 12, url: 'https://leetcode.com/problems/climbing-stairs/' },
  { id: 'nc-min-cost-climbing', lcId: 746, title: 'Min Cost Climbing Stairs', difficulty: 'easy', pattern: '1-D DP', topics: ['dp', 'arrays'], patternOrder: 2, patternIndex: 12, url: 'https://leetcode.com/problems/min-cost-climbing-stairs/' },
  { id: 'nc-house-robber', lcId: 198, title: 'House Robber', difficulty: 'medium', pattern: '1-D DP', topics: ['dp', 'arrays'], patternOrder: 3, patternIndex: 12, url: 'https://leetcode.com/problems/house-robber/' },
  { id: 'nc-house-robber-ii', lcId: 213, title: 'House Robber II', difficulty: 'medium', pattern: '1-D DP', topics: ['dp', 'arrays'], patternOrder: 4, patternIndex: 12, url: 'https://leetcode.com/problems/house-robber-ii/' },
  { id: 'nc-longest-palindromic', lcId: 5, title: 'Longest Palindromic Substring', difficulty: 'medium', pattern: '1-D DP', topics: ['dp', 'strings', 'two-pointers'], patternOrder: 5, patternIndex: 12, url: 'https://leetcode.com/problems/longest-palindromic-substring/' },
  { id: 'nc-palindromic-substrings', lcId: 647, title: 'Palindromic Substrings', difficulty: 'medium', pattern: '1-D DP', topics: ['dp', 'strings', 'two-pointers'], patternOrder: 6, patternIndex: 12, url: 'https://leetcode.com/problems/palindromic-substrings/' },
  { id: 'nc-decode-ways', lcId: 91, title: 'Decode Ways', difficulty: 'medium', pattern: '1-D DP', topics: ['dp', 'strings', 'memoization'], patternOrder: 7, patternIndex: 12, url: 'https://leetcode.com/problems/decode-ways/' },
  { id: 'nc-coin-change', lcId: 322, title: 'Coin Change', difficulty: 'medium', pattern: '1-D DP', topics: ['dp', 'arrays', 'bfs'], patternOrder: 8, patternIndex: 12, url: 'https://leetcode.com/problems/coin-change/' },
  { id: 'nc-max-product-subarray', lcId: 152, title: 'Maximum Product Subarray', difficulty: 'medium', pattern: '1-D DP', topics: ['dp', 'arrays'], patternOrder: 9, patternIndex: 12, url: 'https://leetcode.com/problems/maximum-product-subarray/' },
  { id: 'nc-word-break', lcId: 139, title: 'Word Break', difficulty: 'medium', pattern: '1-D DP', topics: ['dp', 'arrays', 'strings', 'trie', 'memoization'], patternOrder: 10, patternIndex: 12, url: 'https://leetcode.com/problems/word-break/' },
  { id: 'nc-longest-increasing', lcId: 300, title: 'Longest Increasing Subsequence', difficulty: 'medium', pattern: '1-D DP', topics: ['dp', 'arrays', 'binary-search'], patternOrder: 11, patternIndex: 12, url: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
  { id: 'nc-partition-equal-subset', lcId: 416, title: 'Partition Equal Subset Sum', difficulty: 'medium', pattern: '1-D DP', topics: ['dp', 'arrays'], patternOrder: 12, patternIndex: 12, url: 'https://leetcode.com/problems/partition-equal-subset-sum/' },

  // 2-D DP (index 13)
  { id: 'nc-unique-paths', lcId: 62, title: 'Unique Paths', difficulty: 'medium', pattern: '2-D DP', topics: ['dp', 'math', 'combinatorics'], patternOrder: 1, patternIndex: 13, url: 'https://leetcode.com/problems/unique-paths/' },
  { id: 'nc-longest-common-subseq', lcId: 1143, title: 'Longest Common Subsequence', difficulty: 'medium', pattern: '2-D DP', topics: ['dp', 'strings'], patternOrder: 2, patternIndex: 13, url: 'https://leetcode.com/problems/longest-common-subsequence/' },
  { id: 'nc-best-stock-cooldown', lcId: 309, title: 'Best Time to Buy Stock with Cooldown', difficulty: 'medium', pattern: '2-D DP', topics: ['dp', 'arrays'], patternOrder: 3, patternIndex: 13, url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/' },
  { id: 'nc-coin-change-ii', lcId: 518, title: 'Coin Change II', difficulty: 'medium', pattern: '2-D DP', topics: ['dp', 'arrays'], patternOrder: 4, patternIndex: 13, url: 'https://leetcode.com/problems/coin-change-ii/' },
  { id: 'nc-target-sum', lcId: 494, title: 'Target Sum', difficulty: 'medium', pattern: '2-D DP', topics: ['dp', 'arrays', 'backtracking'], patternOrder: 5, patternIndex: 13, url: 'https://leetcode.com/problems/target-sum/' },
  { id: 'nc-interleaving-string', lcId: 97, title: 'Interleaving String', difficulty: 'medium', pattern: '2-D DP', topics: ['dp', 'strings', 'memoization'], patternOrder: 6, patternIndex: 13, url: 'https://leetcode.com/problems/interleaving-string/' },
  { id: 'nc-longest-increasing-path', lcId: 329, title: 'Longest Increasing Path in Matrix', difficulty: 'hard', pattern: '2-D DP', topics: ['dp', 'dfs', 'bfs', 'matrix', 'memoization'], patternOrder: 7, patternIndex: 13, url: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/' },
  { id: 'nc-distinct-subsequences', lcId: 115, title: 'Distinct Subsequences', difficulty: 'hard', pattern: '2-D DP', topics: ['dp', 'strings'], patternOrder: 8, patternIndex: 13, url: 'https://leetcode.com/problems/distinct-subsequences/' },
  { id: 'nc-edit-distance', lcId: 72, title: 'Edit Distance', difficulty: 'medium', pattern: '2-D DP', topics: ['dp', 'strings'], patternOrder: 9, patternIndex: 13, url: 'https://leetcode.com/problems/edit-distance/' },
  { id: 'nc-burst-balloons', lcId: 312, title: 'Burst Balloons', difficulty: 'hard', pattern: '2-D DP', topics: ['dp', 'arrays', 'divide-and-conquer'], patternOrder: 10, patternIndex: 13, url: 'https://leetcode.com/problems/burst-balloons/' },
  { id: 'nc-regular-expression', lcId: 10, title: 'Regular Expression Matching', difficulty: 'hard', pattern: '2-D DP', topics: ['dp', 'strings', 'recursion'], patternOrder: 11, patternIndex: 13, url: 'https://leetcode.com/problems/regular-expression-matching/' },

  // Greedy (index 14)
  { id: 'nc-max-subarray', lcId: 53, title: 'Maximum Subarray', difficulty: 'medium', pattern: 'Greedy', topics: ['greedy', 'dp', 'arrays', 'divide-and-conquer'], patternOrder: 1, patternIndex: 14, url: 'https://leetcode.com/problems/maximum-subarray/' },
  { id: 'nc-jump-game', lcId: 55, title: 'Jump Game', difficulty: 'medium', pattern: 'Greedy', topics: ['greedy', 'dp', 'arrays'], patternOrder: 2, patternIndex: 14, url: 'https://leetcode.com/problems/jump-game/' },
  { id: 'nc-jump-game-ii', lcId: 45, title: 'Jump Game II', difficulty: 'medium', pattern: 'Greedy', topics: ['greedy', 'dp', 'arrays'], patternOrder: 3, patternIndex: 14, url: 'https://leetcode.com/problems/jump-game-ii/' },
  { id: 'nc-gas-station', lcId: 134, title: 'Gas Station', difficulty: 'medium', pattern: 'Greedy', topics: ['greedy', 'arrays'], patternOrder: 4, patternIndex: 14, url: 'https://leetcode.com/problems/gas-station/' },
  { id: 'nc-hand-of-straights', lcId: 846, title: 'Hand of Straights', difficulty: 'medium', pattern: 'Greedy', topics: ['greedy', 'arrays', 'hashmap', 'sorting'], patternOrder: 5, patternIndex: 14, url: 'https://leetcode.com/problems/hand-of-straights/' },
  { id: 'nc-merge-triplets', lcId: 1899, title: 'Merge Triplets to Form Target', difficulty: 'medium', pattern: 'Greedy', topics: ['greedy', 'arrays'], patternOrder: 6, patternIndex: 14, url: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/' },
  { id: 'nc-partition-labels', lcId: 763, title: 'Partition Labels', difficulty: 'medium', pattern: 'Greedy', topics: ['greedy', 'hashmap', 'strings', 'two-pointers'], patternOrder: 7, patternIndex: 14, url: 'https://leetcode.com/problems/partition-labels/' },
  { id: 'nc-valid-parenthesis-string', lcId: 678, title: 'Valid Parenthesis String', difficulty: 'medium', pattern: 'Greedy', topics: ['greedy', 'strings', 'dp', 'stack'], patternOrder: 8, patternIndex: 14, url: 'https://leetcode.com/problems/valid-parenthesis-string/' },

  // Intervals (index 15)
  { id: 'nc-insert-interval', lcId: 57, title: 'Insert Interval', difficulty: 'medium', pattern: 'Intervals', topics: ['intervals', 'arrays'], patternOrder: 1, patternIndex: 15, url: 'https://leetcode.com/problems/insert-interval/' },
  { id: 'nc-merge-intervals', lcId: 56, title: 'Merge Intervals', difficulty: 'medium', pattern: 'Intervals', topics: ['intervals', 'arrays', 'sorting'], patternOrder: 2, patternIndex: 15, url: 'https://leetcode.com/problems/merge-intervals/' },
  { id: 'nc-non-overlapping', lcId: 435, title: 'Non-overlapping Intervals', difficulty: 'medium', pattern: 'Intervals', topics: ['intervals', 'arrays', 'greedy', 'sorting'], patternOrder: 3, patternIndex: 15, url: 'https://leetcode.com/problems/non-overlapping-intervals/' },
  { id: 'nc-meeting-rooms', lcId: 252, title: 'Meeting Rooms', difficulty: 'easy', pattern: 'Intervals', topics: ['intervals', 'arrays', 'sorting'], patternOrder: 4, patternIndex: 15, url: 'https://leetcode.com/problems/meeting-rooms/' },
  { id: 'nc-meeting-rooms-ii', lcId: 253, title: 'Meeting Rooms II', difficulty: 'medium', pattern: 'Intervals', topics: ['intervals', 'arrays', 'sorting', 'heap'], patternOrder: 5, patternIndex: 15, url: 'https://leetcode.com/problems/meeting-rooms-ii/' },
  { id: 'nc-minimum-interval', lcId: 1851, title: 'Minimum Interval to Include Query', difficulty: 'hard', pattern: 'Intervals', topics: ['intervals', 'arrays', 'sorting', 'heap', 'binary-search'], patternOrder: 6, patternIndex: 15, url: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/' },

  // Math & Geometry (index 16)
  { id: 'nc-rotate-image', lcId: 48, title: 'Rotate Image', difficulty: 'medium', pattern: 'Math & Geometry', topics: ['math', 'matrix', 'arrays'], patternOrder: 1, patternIndex: 16, url: 'https://leetcode.com/problems/rotate-image/' },
  { id: 'nc-spiral-matrix', lcId: 54, title: 'Spiral Matrix', difficulty: 'medium', pattern: 'Math & Geometry', topics: ['math', 'matrix', 'arrays'], patternOrder: 2, patternIndex: 16, url: 'https://leetcode.com/problems/spiral-matrix/' },
  { id: 'nc-set-matrix-zeroes', lcId: 73, title: 'Set Matrix Zeroes', difficulty: 'medium', pattern: 'Math & Geometry', topics: ['math', 'matrix', 'arrays'], patternOrder: 3, patternIndex: 16, url: 'https://leetcode.com/problems/set-matrix-zeroes/' },
  { id: 'nc-happy-number', lcId: 202, title: 'Happy Number', difficulty: 'easy', pattern: 'Math & Geometry', topics: ['math', 'hashmap', 'fast-slow-pointer'], patternOrder: 4, patternIndex: 16, url: 'https://leetcode.com/problems/happy-number/' },
  { id: 'nc-plus-one', lcId: 66, title: 'Plus One', difficulty: 'easy', pattern: 'Math & Geometry', topics: ['math', 'arrays'], patternOrder: 5, patternIndex: 16, url: 'https://leetcode.com/problems/plus-one/' },
  { id: 'nc-pow-x-n', lcId: 50, title: 'Pow(x, n)', difficulty: 'medium', pattern: 'Math & Geometry', topics: ['math', 'recursion', 'divide-and-conquer'], patternOrder: 6, patternIndex: 16, url: 'https://leetcode.com/problems/powx-n/' },
  { id: 'nc-multiply-strings', lcId: 43, title: 'Multiply Strings', difficulty: 'medium', pattern: 'Math & Geometry', topics: ['math', 'strings', 'simulation'], patternOrder: 7, patternIndex: 16, url: 'https://leetcode.com/problems/multiply-strings/' },
  { id: 'nc-detect-squares', lcId: 2013, title: 'Detect Squares', difficulty: 'medium', pattern: 'Math & Geometry', topics: ['math', 'hashmap', 'design', 'geometry'], patternOrder: 8, patternIndex: 16, url: 'https://leetcode.com/problems/detect-squares/' },

  // Bit Manipulation (index 17)
  { id: 'nc-single-number', lcId: 136, title: 'Single Number', difficulty: 'easy', pattern: 'Bit Manipulation', topics: ['bit-manipulation', 'arrays'], patternOrder: 1, patternIndex: 17, url: 'https://leetcode.com/problems/single-number/' },
  { id: 'nc-number-of-1-bits', lcId: 191, title: 'Number of 1 Bits', difficulty: 'easy', pattern: 'Bit Manipulation', topics: ['bit-manipulation', 'divide-and-conquer'], patternOrder: 2, patternIndex: 17, url: 'https://leetcode.com/problems/number-of-1-bits/' },
  { id: 'nc-counting-bits', lcId: 338, title: 'Counting Bits', difficulty: 'easy', pattern: 'Bit Manipulation', topics: ['bit-manipulation', 'dp'], patternOrder: 3, patternIndex: 17, url: 'https://leetcode.com/problems/counting-bits/' },
  { id: 'nc-reverse-bits', lcId: 190, title: 'Reverse Bits', difficulty: 'easy', pattern: 'Bit Manipulation', topics: ['bit-manipulation', 'divide-and-conquer'], patternOrder: 4, patternIndex: 17, url: 'https://leetcode.com/problems/reverse-bits/' },
  { id: 'nc-missing-number', lcId: 268, title: 'Missing Number', difficulty: 'easy', pattern: 'Bit Manipulation', topics: ['bit-manipulation', 'arrays', 'math', 'sorting'], patternOrder: 5, patternIndex: 17, url: 'https://leetcode.com/problems/missing-number/' },
  { id: 'nc-sum-of-two-integers', lcId: 371, title: 'Sum of Two Integers', difficulty: 'medium', pattern: 'Bit Manipulation', topics: ['bit-manipulation', 'math'], patternOrder: 6, patternIndex: 17, url: 'https://leetcode.com/problems/sum-of-two-integers/' },
  { id: 'nc-reverse-integer', lcId: 7, title: 'Reverse Integer', difficulty: 'medium', pattern: 'Bit Manipulation', topics: ['bit-manipulation', 'math'], patternOrder: 7, patternIndex: 17, url: 'https://leetcode.com/problems/reverse-integer/' },
]
