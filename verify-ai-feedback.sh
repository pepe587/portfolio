#!/bin/bash

echo "🔍 Verifying AI Feedback Setup..."
echo ""

# Check for ai-feedback.json
if [ -f "public/ai-feedback.json" ]; then
    echo "✅ ai-feedback.json found"
    echo "   Content:"
    cat public/ai-feedback.json | jq '.' 2>/dev/null || cat public/ai-feedback.json
else
    echo "❌ ai-feedback.json NOT found"
fi

echo ""

# Check for ai-instructions.txt
if [ -f "public/ai-instructions.txt" ]; then
    echo "✅ ai-instructions.txt found"
else
    echo "❌ ai-instructions.txt NOT found"
fi

echo ""

# Check HTML meta tags
if grep -q "ai-feedback" index.html; then
    echo "✅ HTML meta tags found"
    grep "ai-feedback" index.html
else
    echo "❌ HTML meta tags NOT found"
fi

echo ""

# Check for React hook
if [ -f "src/hooks/useAIFeedback.jsx" ]; then
    echo "✅ useAIFeedback hook found"
else
    echo "❌ useAIFeedback hook NOT found"
fi

echo ""

# Check for React component
if [ -f "src/components/AIFeedbackBadge.jsx" ]; then
    echo "✅ AIFeedbackBadge component found"
else
    echo "❌ AIFeedbackBadge component NOT found"
fi

echo ""
echo "🎯 Setup complete! Files are ready for deployment."
echo ""
echo "📝 Next steps:"
echo "   1. Import AIFeedbackBadge in your footer/layout component"
echo "   2. Run: npm run build"
echo "   3. Deploy to your hosting service"
echo ""
echo "💡 How it works:"
echo "   - IAs will see meta tags and find /ai-feedback.json"
echo "   - Users will see 'Open to AI feedback' badge"
echo "   - File /ai-instructions.txt provides guidelines"
echo ""
