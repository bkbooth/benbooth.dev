---
title: Animating Loading Spinners with CSS
date: 2017-06-21T08:49:09+10:00
description: On a recent side project I had wasted a bunch of time creating a fancy loading spinner while I was mentally blocked trying to solve a real problem. Explore the interesting parts of the CSS animation API through the medium of loading spinners.
tags: [Coding, SydCSS, CSS, Animation, Keyframes]
hero:
  image: ../../assets/css-animation/highres_461629142.jpg
  alt: Ben Booth presenting this talk at SydCSS
---

I recently had the privilege of being invited to give my first ever meetup talk at [SydCSS][]. It was a first time speakers night so short talks (5 mins) and high nerves were the order of the day. On a recent side project I had wasted a bunch of time creating a fancy loading spinner while I was mentally blocked trying to solve a real problem. I had the idea at the time that I could probably give a reasonably interesting talk by making some loading animations with CSS and explaining the interesting parts of the [CSS animation][css-animation] API used for each animation. I had a rough plan and a platform, the rest of this article is the transcript of that talk rewritten as a blog post.

> You can view the [slides][] for the talk [here][slides], take a look and play around with the examples on the slides!

There are two basic building blocks for [CSS animations][css-animation]. Firstly the [`@keyframes` at-rule][css-keyframes], which you define with the `@keyframes` keyword, then a name or identifier for the keyframes set, then a list of steps which define CSS properties for each step.

```css
@keyframes my-sweet-animation {
  0% {
    /* ... */
  }
  50% {
    /* ... */
  }
  100% {
    /* ... */
  }
}
```

Secondly the [`animation`][css-animation] properties which you can use in shorthand form, or by using individual sub-properties.

```css
@keyframes my-sweet-animation {
  /* ... */
}

.thing-to-animate {
  /* shorthand */
  animation: 2s my-sweet-animation;

  /* individual sub-properties */
  animation-name: my-sweet-animation;
  animation-duration: 2s;
  animation-timing-function: ease;
}
```

There are 8 `animation` sub-properties and they provide a great deal of flexibility: [`animation-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name), [`animation-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration), [`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay), [`animation-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction), [`animation-iteration-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count), [`animation-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function), [`animation-fill-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode) and [`animation-play-state`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state).

## Fading

<iframe height="265" style="width: 100%;" scrolling="no" title="Fading dot, 3-step @keyframes" src="//codepen.io/bkbooth/embed/WOjvPM/?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bkbooth/pen/WOjvPM/'>Fading dot, 3-step @keyframes</a> by Ben (<a href='https://codepen.io/bkbooth'>@bkbooth</a>)
  on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Starting with a simple fading dot animation, which is just a block with rounded corners where the `opacity` is being faded in and out. I've defined the [`@keyframes` at-rule][css-keyframes] with 3 steps going from completely visible, to completely invisible, then back to completely visible. To use these keyframes to animate the dot, I've used the [`animation`][css-animation] shorthand property to set the `animation-duration` to _1 second_; the `animation-name` to _'fade-in-out'_ which matches the `@keyframes` at-rule; and _'infinite'_ for the `animation-iteration-count`. `animation-iteration-count` can be a number or _'infinite'_ and defaults to _1_. A single pass through the keyframes isn't very useful for loading animations, so I'll be using _'infinite'_ for all of these animations. You can tweak the speed of the animation by modifying the `animation-duration` property which takes seconds or milliseconds values.

<iframe height="266" style="width: 100%;" scrolling="no" title="Fading dot, 2-step @keyframes" src="//codepen.io/bkbooth/embed/wedKWj/?height=266&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bkbooth/pen/wedKWj/'>Fading dot, 2-step @keyframes</a> by Ben (<a href='https://codepen.io/bkbooth'>@bkbooth</a>)
  on <a href='https://codepen.io'>CodePen</a>.
</iframe>

In this case the [`@keyframes` at-rule][css-keyframes] can be simplified to just the start and end steps by setting the `animation-direction` property to _'alternate'_, which means the animation goes forward through the keyframes steps, then back through in reverse. Now that a full animation loop goes through the keyframes twice, the `animation-duration` should be halved. This approach means that you can define more generic and reusable [`@keyframes` at-rules][css-keyframes]. You may also see _'from'_ and _'to'_ instead of percentages for keyframes steps, these are just aliases for _'0%'_ and _'100%'_ respectively. I personally prefer to stick with percentage steps.

## Spinning

<iframe height="263" style="width: 100%;" scrolling="no" title="Rotating star" src="//codepen.io/bkbooth/embed/yXboZM/?height=263&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bkbooth/pen/yXboZM/'>Rotating star</a>
  by Ben (<a href='https://codepen.io/bkbooth'>@bkbooth</a>)
  on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Spinners are another simple animation that can be defined easily in CSS. I've introduced the [`transform`][css-transform] property to handle the rotation, [`transform`][css-transform] provides a great toolset of functions for 2D and 3D translating (as in movement), scaling and rotation. The _'rotate'_ [`@keyframes` at-rule][css-keyframes] just sets the starting rotation to _'0deg'_ and the ending rotation to _'360deg'_. I've introduced the `animation-timing-function` property and set it to _'linear'_. `animation-timing-function` defaults to _'ease'_ to ease the animation in and out, this caused the fading dot to "breathe" in and out. If a rotation animation uses _'ease'_ it speeds up and slows down, for rotation you want a nice even _'linear'_ animation.

<iframe height="270" style="width: 100%;" scrolling="no" title="Rotating concentric circles" src="//codepen.io/bkbooth/embed/RgVZvO/?height=231&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bkbooth/pen/RgVZvO/'>Rotating concentric circles</a>
  by Ben (<a href='https://codepen.io/bkbooth'>@bkbooth</a>)
  on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Using the same rotation [`@keyframes` at-rule][css-keyframes] you can create more complex animations by just combining things we've already looked at. Another value that you can set for the `animation-direction` property is _'reverse'_ which as you can probably guess, plays the keyframes in reverse.

You can use the same `keyframes` to rotate pretty much anything you want...

<iframe height="203" style="width: 100%;" scrolling="no" title="Rotating doge" src="//codepen.io/bkbooth/embed/awWyeK/?height=203&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bkbooth/pen/awWyeK/'>Rotating doge</a>
  by Ben (<a href='https://codepen.io/bkbooth'>@bkbooth</a>)
  on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Chasing

<iframe height="405" style="width: 100%;" scrolling="no" title="Chasing dots, CSS" src="//codepen.io/bkbooth/embed/pwPWjw/?height=399&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bkbooth/pen/pwPWjw/'>Chasing dots, CSS</a>
  by Ben (<a href='https://codepen.io/bkbooth'>@bkbooth</a>)
  on <a href='https://codepen.io'>CodePen</a>.
</iframe>

For this animation I've arranged a series of small dots around a circle and used a similar [`@keyframes` at-rule][css-keyframes] as earlier, fading the dots in and out to _'20%'_ `opacity`. The main [`animation`][css-animation] shorthand property adds nothing new and is being applied to all of the individual dots with an attribute selector. I've set an `animation-delay` for each of the dots to offset each of them starting by an 1/8th of a second. As you can see it's a little tedious having to manually set the offset for each dot, especially if you wanted to change the speed of the whole animation.

<iframe height="350" style="width: 100%;" scrolling="no" title="Chasing dots, SCSS" src="//codepen.io/bkbooth/embed/zzwEqa/?height=331&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bkbooth/pen/zzwEqa/'>Chasing dots, SCSS</a>
  by Ben (<a href='https://codepen.io/bkbooth'>@bkbooth</a>)
  on <a href='https://codepen.io'>CodePen</a>.
</iframe>

If you're using SASS or something similar, you can improve on this by setting the desired animation speed and the number of dots in variables. Halve the animation speed for the [`animation`][css-animation] property definition. Then loop through the number of dots and calculate the `animation-delay` for each dot using the desired animation speed, number of dots and current iteration variables.

## Bouncing

<iframe height="315" style="width: 100%;" scrolling="no" title="Bouncing dot, single" src="//codepen.io/bkbooth/embed/owWGGr/?height=284&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bkbooth/pen/owWGGr/'>Bouncing dot, single</a>
  by Ben (<a href='https://codepen.io/bkbooth'>@bkbooth</a>)
  on <a href='https://codepen.io'>CodePen</a>.
</iframe>

This bouncing dot animation uses yet another fairly simple [`@keyframes` at-rule][css-keyframes], it's just using the [`transform`][css-transform] property to translate the dot up, and I'm using _'alternate'_ for the `animation-direction` again. To make it look more "bouncy" I've defined a _'cubic-bezier'_ function for the `animation-timing-function` property. If that looks a little daunting to you, don't worry, I didn't actually write this, and you should never need to write one of these by hand because Chrome (and possibly other browsers?) has an awesome bezier curve editor where you can just drag some dots to visually create the cubic-bezier curve and it will write the cubic-bezier function for you.

![Chrome cubic-bezier editor](../../assets/css-animation/cubic-bezier.png 'Chrome cubic-bezier editor')

<iframe height="365" style="width: 100%;" scrolling="no" title="Bouncing dot, triple" src="//codepen.io/bkbooth/embed/XgReQG/?height=356&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bkbooth/pen/XgReQG/'>Bouncing dot, triple</a>
  by Ben (<a href='https://codepen.io/bkbooth'>@bkbooth</a>)
  on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Finally, to create this excitedly impatient series of dots, I've defined a slightly more complex [`@keyframes` at-rule][css-keyframes] which performs the translation up and down in just the first 1/3rd of the time. I've also set an `animation-delay` for each of the dots in the series to offset them starting.

## Wrapping Up

Most of this is relatively new to the CSS spec but support in modern browsers is actually really good. Depending what browsers you need to target though you'll get a lot of mileage out of using [autoprefixer](https://github.com/postcss/autoprefixer) to process your CSS and automatically add any required vendor prefixes like `-webkit`, `-moz`, etc.

[![MDN browser support](../../assets/css-animation/mdn-animations.png 'MDN browser support')](https://developer.mozilla.org/en/docs/Web/CSS/animation#Browser_compatibility)

[![Can I use browser support](../../assets/css-animation/caniuse-animations.png 'Can I use browser support')](https://caniuse.com/#feat=css-animation)

MDN is a great learning resources for understanding CSS properties and rules. There's also a really helpful guide on using CSS animations:

- [`@keyframes`][css-keyframes]
- [`animation`][css-animation]
- [Using CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

[sydcss]: https://www.meetup.com/SydCSS/
[slides]: https://github.benbooth.dev/sydcss-talk-animations/
[css-animation]: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
[css-keyframes]: https://developer.mozilla.org/en/docs/Web/CSS/@keyframes
[css-transform]: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
