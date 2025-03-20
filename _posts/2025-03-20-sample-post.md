---
layout: post
title: "Comprehensive Guide to Post Features"
date: 2024-03-25
tags: [tutorial, features, demo]
image: /assets/images/avatar.png
math: true
toc: true
citations:
  - "Smith, J. (2023). Advanced Jekyll Features for Technical Blogs. Journal of Web Publishing, 12(3), 45-67."
  - "Johnson, A. & Williams, B. (2024). Optimizing Content Presentation in Static Sites. Modern Web Techniques, 8(2), 112-128."
  - "Garcia, C. (2022). Interactive Elements in Technical Documentation. Documentation Engineering, 5(4), 78-92."
---

# Introduction to Post Features

This post demonstrates all the enhanced features available for your Jekyll blog posts. You'll see examples of image positioning, foldouts, slideshows, math equations, code blocks, and citations.

## Basic Text Formatting

Before diving into the advanced features, let's review basic Markdown formatting:

- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- `Inline code` for short code snippets
- [Links](https://example.com) to external resources
- > Blockquotes for quotations or callouts

## Image Positioning

### Full-Width Images

{% include image-full.html src="/assets/images/avatar.png" alt="Full-width image example" caption="This is a full-width image with a caption" %}

### Left-Aligned Images

{% include image-left.html src="/assets/images/avatar.png" alt="Left-aligned image" caption="This image is aligned to the left with text wrapping around it" scale="0.7" %}

This text wraps around the left-aligned image. The image takes up approximately 48% of the container width by default, but can be scaled using the optional scale parameter. In this case, we've scaled it to 70% of its default size.

When you have enough text, it will continue to wrap around the image until it extends past the bottom of the image. After that point, the text will return to using the full width of the container.

{% include clearfix.html %}

### Right-Aligned Images

{% include image-right.html src="/assets/images/avatar.png" alt="Right-aligned image" caption="This image is aligned to the right with text wrapping around it" scale="0.5" %}

Similar to the left-aligned image, this one is aligned to the right with text wrapping around it. We've scaled this one to 50% of its default size to demonstrate the scaling functionality.

The clearfix element is important to use after floating elements to ensure proper layout of subsequent content. Without it, elements that follow might unintentionally wrap around the image.

{% include clearfix.html %}

## Foldout Sections

Foldouts are perfect for organizing content that readers might want to skip or reference later. They help keep your post concise while still providing detailed information.

{% capture foldout_content_1 %}
### Nested Markdown Works Inside Foldouts

Foldouts support full Markdown syntax, including:

1. **Formatted text**
2. *Emphasized content*
3. Lists and sublists
   - Nested items
   - With formatting

#### Code Blocks Work Too

```python
def calculate_fibonacci(n):
    """Generate the first n Fibonacci numbers."""
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

print(calculate_fibonacci(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

Even tables work inside foldouts:

| Feature | Support | Notes |
|---------|---------|-------|
| Images  | ✅ Yes  | All alignments supported |
| Code    | ✅ Yes  | Syntax highlighting works |
| Math    | ✅ Yes  | Both inline and display math |
{% endcapture %}

{% include foldout-block.html title="Detailed Implementation Guide (Click to Expand)" content=foldout_content_1 %}

{% capture foldout_content_2 %}
## Mathematical Expressions

Math expressions render properly inside foldouts too:

The Fourier transform is defined as:

$$F(\omega) = \int_{-\infty}^{\infty} f(t)e^{-i\omega t}dt$$

And Einstein's famous equation: $E = mc^2$

The Maxwell equations in differential form:

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$
{% endcapture %}

{% include foldout-block.html title="Mathematical Expressions Example" content=foldout_content_2 open=true %}

## Video Embedding

You can embed videos using the video include:

{% include video.html src="https://www.youtube.com/embed/SQNxZJ6s5ro?si=u5MOAtU3Ic8IObOt" %}

## Code Blocks with Syntax Highlighting

```javascript
// A simple JavaScript example
function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

// Test the function
console.log(calculateFactorial(5)); // Output: 120
```

```csharp
// C# example with syntax highlighting
public class EdgeDetector
{
    public void ProcessImage(Bitmap image)
    {
        // Apply Sobel operator
        int[,] sobelX = { { -1, 0, 1 }, { -2, 0, 2 }, { -1, 0, 1 } };
        int[,] sobelY = { { -1, -2, -1 }, { 0, 0, 0 }, { 1, 2, 1 } };
        
        // Implementation details...
        for (int x = 1; x < image.Width - 1; x++)
        {
            for (int y = 1; y < image.Height - 1; y++)
            {
                // Apply convolution
                // ...
            }
        }
    }
}
```

## Mathematical Equations

You can include both inline math like $f(x) = x^2 + 2x + 1$ and display math:

$$\frac{d}{dx}\left( \int_{0}^{x} f(u)\,du\right)=f(x)$$

The quadratic formula provides solutions to $ax^2 + bx + c = 0$:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

## Citations

When discussing edge detection algorithms, the Canny edge detector {% include citation.html id="1" %} is often considered the gold standard due to its robustness to noise and accurate edge localization.

More recent research by Johnson and Williams {% include citation.html id="2" %} suggests that interactive elements significantly improve reader engagement in technical documentation.

According to Garcia {% include citation.html id="3" %}, the proper presentation of code and mathematical formulas is crucial for technical blogs.

## Conclusion

This post has demonstrated all the enhanced features available for your Jekyll blog:

1. **Image positioning** (full-width, left-aligned, right-aligned) with scaling options
2. **Foldouts** for collapsible content sections with full markdown support
3. **Slideshows** for image and video galleries
4. **Video embedding** for multimedia content
5. **Code blocks** with syntax highlighting
6. **Mathematical expressions** using LaTeX syntax
7. **Citations** with automatic bibliography generation

These features provide powerful tools for creating rich, interactive technical content that engages your readers while maintaining excellent organization and readability.