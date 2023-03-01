---
date: 2023-03-01T16:23:14Z
title: Font-smoothing and rendering
description: ''
tags: []
noteWithTitle: false
linkTarget: ''
mainImage.url: ''
mainImage.alt: ''
mainImage.aspectRatioWidth: ''
mainImage.aspectRatioHeight: ''
mainImage.srcsetWidths: ''
mainImage.sizes: ''
mainImage.isAnchor: false
draft: true

---
Should we use `-webkit-font-smoothing: antialiased`?

**Those saying no:**

[https://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/](https://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/ "https://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/")

[https://github.com/google/fonts/issues/1170](https://github.com/google/fonts/issues/1170 "https://github.com/google/fonts/issues/1170")

**Other potential reasons against:**

I said “it’s a _non-standard_ that we shouldn’t support. Non-standards give unpredictable results, lack documentation, can cause accessibility issues.”… and that feels especially bad if we apply it at a global level. 

[https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth "https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth")

**Those saying yes:**

[https://www.joshwcomeau.com/css/custom-css-reset/#five-font-smoothing-6](https://www.joshwcomeau.com/css/custom-css-reset/#five-font-smoothing-6 "https://www.joshwcomeau.com/css/custom-css-reset/#five-font-smoothing-6")

**What about `text-rendering`?**

Andy Bell no longer uses `optimizeLegibility`

[https://andy-bell.co.uk/a-modern-css-reset/#:\~:text=Using%C2%A0optimizeLegibility%C2%A0makes%20your%20text%20look%20nicer%2C%20but%20can%20have%20serious%20performance%20issues%20such%20as%C2%A030%20second%20loading%20delays%2C%20so%20I%20try%20to%20avoid%20that%20now.%20I%20do%20sometimes%20add%20it%20to%20sections%20of%20microcopy%20though.](https://andy-bell.co.uk/a-modern-css-reset/#:\~:text=Using%C2%A0optimizeLegibility%C2%A0makes%20your%20text%20look%20nicer%2C%20but%20can%20have%20serious%20performance%20issues%20such%20as%C2%A030%20second%20loading%20delays%2C%20so%20I%20try%20to%20avoid%20that%20now.%20I%20do%20sometimes%20add%20it%20to%20sections%20of%20microcopy%20though. "https://andy-bell.co.uk/a-modern-css-reset/#:~:text=Using%C2%A0optimizeLegibility%C2%A0makes%20your%20text%20look%20nicer%2C%20but%20can%20have%20serious%20performance%20issues%20such%20as%C2%A030%20second%20loading%20delays%2C%20so%20I%20try%20to%20avoid%20that%20now.%20I%20do%20sometimes%20add%20it%20to%20sections%20of%20microcopy%20though.")