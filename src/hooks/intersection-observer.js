import { useEffect, useRef, useState } from 'react';

/**
 * Detect when an element enters the viewport
 *
 * @param {Object} options Intersection Observer options
 * @param {element} options.root - The element that is used as the viewport for checking visibility
 *   of the target. Must be the ancestor of the target. Defaults to the browser viewport if not
 *   specified or if null.
 * @param {string} options.rootMargin - Margin around the root. A string of one to four values
 *   similar to the CSS margin property, e.g., "10px 20px 30px 40px" (top, right, bottom, left). The
 *   values can only be in pixels (px) or percentages (%). This set of values serves to grow or
 *   shrink each side of the root element's bounding box before computing intersections. Negative
 *   values will shrink the bounding box of the root element and positive values will expand it. The
 *   default value, if not specified, is "0px 0px 0px 0px".
 * @param {number} options.threshold - Either a single number or an array of numbers which indicate
 *   at what percentage of the target's visibility the observer's callback should be executed. If
 *   you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you
 *   want the callback to run every time visibility passes another 25%, you would specify the array
 *   [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the
 *   callback will be run). A value of 1.0 means that the threshold isn't considered passed until
 *   every pixel is visible.
 * @returns {[ref, boolean]} A tuple containing:
 *
 *   - `ref`: the reference to the element to observe
 *   - `isIntersecting`: whether the element is intersecting the viewport
 */
export const useIntersectionObserver = (options) => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);
    const elem = ref.current;

    if (elem) {
      observer.observe(elem);
    }

    return () => {
      if (elem) {
        observer.unobserve(elem);
      }
      observer.disconnect();
    };
  }, [options]);

  return [ref, isIntersecting];
};
