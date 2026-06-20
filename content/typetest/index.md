---
layout: layouts/basic_prose.njk
title: Typographic and Opentype Default Stylesheet (TODS)
eleventyExcludeFromCollections: true
pageSpecificRobotsDirective: noindex
---
# Sample content for typography testing

<p>The concept is that <abbr class="u-smallcaps">TODS</abbr> sets sensible typographic defaults for use on prose (a column of text like this one). For full details see the <a href="https://github.com/clagnut/TODS">readme in the Github repo</a>. The page you’re reading uses fairly random bits of text to demonstrate most aspects of <abbr class="u-smallcaps">TODS</abbr>, which you can toggle on and off.</p>

<p><em>This page could be much better and is missing some stuff, such as dark mode. Feel free to branch and edit.</em></p>

<h2>1440 ‒ 1500, the Incunabula</h2>
<p>The word incunabula comes from the Latin cunae, meaning <q>cradle.</q> It can describe the earliest stages in the development of anything, but it has come to stand particularly for those books produced before 1500. The meagre information about Gutenberg and his works at the time of his death has not been substantially added to since.</p>

<h3>The 42-line bible</h3>

<p>By 1448 he had returned to Mainz and had obtained a loan of 150 gulden from a relative there. This was insufficient for his needs since he was again seeking financial backing only two years later. This time he borrowed 800 gulden, at 6 per cent interest, from Johann Fust.</p>


<h2>The job of typography</h2>

<p>The revered type designer Hermann Zapf said that, for designers, <q>typographic design is sometimes misconstrued as a form of private self-expression</q><sup>(2)</a></sup>. Typography is not art – it is craft and design with purpose. It is there to perform a service for the reader. Quoting another great designer, Emil Ruder said in 1969<sup>(3)</sup>:</p>

<blockquote class="quoted">
  <p>Typography has one plain duty before it and that is to convey information in writing. No argument or consideration can absolve typography from this duty. A printed work which cannot be read becomes a product without purpose.</p>
</blockquote>

<p>A website which cannot be read is a product without purpose. Typography’s chief role is to ensure legibility and readability, but that’s not its only job. Typography should invite the reader into the text.</p>

<h2>Positional numeral systems</h2>
<p>In any standard positional numeral system, a number is conventionally written as (x)<sub>y</sub> with x as the string of digits and y as its base. For example, comparing values in hexadecimal, decimal, and octal one might write <span class="lnum">C<sub>12</sub>=12<sub>10</sub>=14<sub>8</sub></span>. Alternatively you could abbreviate like this: <span class="lnum">C<sub>hex</sub>=12<sub>dec</sub>=14<sub>oct</sub></span>.</p>

<h3>Caffeine</h3>

<p>Caffeine is a central nervous system <abbr class="u-smallcaps">(CNS)</abbr> stimulant of the <code>methylxanthine</code> class. Its chemical formula is C<sub>10</sub>H<sub>16</sub>N<sub>5</sub>O<sub>13</sub>P<sub>3</sub>, which you should really typeset using scientific inferiors instead of subscripts: <span class="sinf">C10H16N5O13P3</span>.</p>

<h3>Populations</h3>

<p>Here is recent data on some European countries.</p>

<table class="ex-alignment">
<thead>
    <tr><th>Country</th><th class='nums'>Area</th><th class='nums'>Population</th><th class='nums'>GDP</th><th>Capital</th></tr>
</thead>
<tbody>
<tr><td>Austria</td><td class='nums'>83,858</td><td class='nums'>8,169,929</td><td class='nums'>339</td><td>Vienna</td></tr>
<tr><td>Belgium</td><td class='nums'>30,528</td><td class='nums'>11,007,000</td><td class='nums'>410</td><td>Brussels</td></tr>
<tr><td>Denmark</td><td class='nums'>43,094</td><td class='nums'>5,564,219</td><td class='nums'>271</td><td>Copenhagen</td></tr>
<tr><td>France</td><td class='nums'>547,030</td><td class='nums'>66,104,000</td><td class='nums'>2,181</td><td>Paris</td></tr>
<tr><td>Germany</td><td class='nums'>357,021</td><td class='nums'>80,716,000</td><td class='nums'>3,032</td><td>Berlin</td></tr>
<tr><td>Greece</td><td class='nums'>131,957</td><td class='nums'>11,123,034</td><td class='nums'>176</td><td>Athens</td></tr>
    </tbody>
</table>

<h2 class="bookmania bookmania1">Chicken</h2>
<h2 class="bookmania bookmania1 dlig">Chic<span class="swsh17">k</span>e<span class="ss17-18">n</span></h2>

<h2 class="bookmania bookmania2">Huevos</h2>
<h2 class="bookmania bookmania2"><span class="ss10-14-19">H</span>ue<span class="swsh20">v</span>o<span class="ss16">s</span></h2>

<p>The heading above should be made up of contextual ligatures, discretionary ligatures and various swashes.</p>

<h2>Colophon</h2>

<p>The fonts used on the page are <a href="">Literata</a>, <a href="">Roboto Flex</a> and <a href="">Bookmania</a>.</p>

<p>As of <time data-js="clock" datetime="00:00:00">00:00:00</time> we had <span data-js="counter" class="tnum">1000</span> likes.</p>

<p class="uppercase spam">SEND YOUR SPAM TO SPAM@CLEARLEFT.COM (NO DUCK-PICS PLS).</p>

<div class="gradecompare">
	<div>
		<h2>Heading</h2>
		<p>Each opening or closing quote is replaced by one of the strings from the value of quotes</p>
	</div>
	<div class="inverted">
		<h2>Heading</h2>
		<p>Each opening or closing quote is replaced by one of the strings from the value of quotes</p>
	</div>
</div>

---

<p>The visual design of this website is unashamedly based on the front cover of a fabulous book, <a href="http://www.amazon.co.uk/dp/389955468X?tag=jalfrezi-21"><cite>Designing News</cite></a> by <a href="http://www.FrancescoFranchi.com">Francesco Franchi</a>, as published in hard back September 2013.</p>

<p>Headings and body text are all set in the variable font <a href="https://www.type-together.com/literata-font">Literata</a> designed by Veronika Burian and José Scaglione of TypeTogether. Captions and tables are set in a variable version of <a href="https://www.ibm.com/plex/">IBM Plex Sans</a>, designed by Mike Abbink, Paul van der Laan, and Pieter van Rosmalen of <a href="https://www.boldmonday.com">Bold Monday</a>. Code is set in a variable version of <a href="http://levien.com/type/myfonts/inconsolata.html">Inconsolata</a> by Raph Levien.</p>

<p>The site is built on a homemade <abbr class="smcp">CMS</abbr>. It was hand-coded in <a href="https://nova.app">Nova</a>, marked up using semantic <abbr class="smcp">HTML</abbr> and <abbr class="smcp">CSS</abbr>. It’s hosted by <a href="https://krystal.io">Krystal</a>, whom I’m very happy to recommend – use the offer code <span class="smcp">RICH10QUIDOFF</span> to get £10 off hosting (I’ll get that too).</p>

<p>I’ve used responsive design techniques to hopefully ensure the site is nicely readable on lots of devices. Text is scaled using <a href="https://utopia.fyi">Utopian techniques</a>. I’ve put together a kind of <a href="#styleguide">style guide</a>, mostly as a check that all likely mark-up is styled appropriately. While the site has not been widely tested, it should be fine on all modern browsers. Please <a href="/about#contact">let me know</a> if you come across any problems.</p>

</section>
<section class='stack center'>

<h2 id="styleguide">Style&nbsp;Guide</h2>

<p>This is a guide to the mark-up styles used throughout the site. In particular it&#8217;s a check that all likely mark-up is styled appropriately.</p>

<h2>Sections (a Level 2&nbsp;Heading)</h2>

<p>The secondary header above is an <code>h2</code> element, which may be used for any form of important page-level header.</p>

<h3>Level&nbsp;3&nbsp;Header</h3>

<p>The header above is an <code>h3</code> element, which may be used for any form of page-level header which falls below the <code>h2</code> header in importance.</p>

<h4>Level&nbsp;4&nbsp;Header</h4>

<p>The header above is an <code>h4</code> element, which may be used for any form of page-level header which falls below the <code>h3</code> header in importance.</p>

<h5>Level&nbsp;5&nbsp;Header</h5>

<p>The header above is an <code>h5</code> element, which may be used for any form of page-level header which falls below the <code>h4</code> header in importance.</p>

<h6>Level&nbsp;6&nbsp;Header</h6>

<p>The header above is an <code>h6</code> element, which may be used for any form of page-level header which falls below the <code>h5</code> header in importance.</p>

<h3>Paragraphs</h3>

<p>All paragraphs are wrapped in <code>p</code> tags. Additionally, <code>p</code> elements can be wrapped with a <code>blockquote</code> element <em>if the <code>p</code> element is indeed a quote</em>.</p>

<p>This is a paragraph directly following a paragraph. There should be a small gap between this and the prior paragraph.</p>

<div class="group-with-aside stack">
<p>This is a paragraph. It has an associated note as aside, which should sit to the right of the main text, otherwise it will be inline. This continues to be a paragraph with an associated note.</p>
<p>This is a second paragraph associated with the same note sitting to the right of the main text, otherwise it will be inline.</p>

<aside><p>This is a note in an aside. On wider screens it will sit to the right of the main text, otherwise it will be inline.</p></aside>
</div>

<p>This is a paragraph following the aside. It does not have an aside associated with it.</p>

<h3>Code&nbsp;block</h3>

<p>Here's a block of code. It should be using <a href="https://prismjs.com/">Prism.js</a> for syntax highlighting and rendered in Inconsolata.</p>

<figure class="pre"><div data-element="code-block"><div class="code-block__header"><div role="alert"></div></div><pre><code class="language-css">p {
    hyphens: auto;
    hyphenate-limit-chars: 6 3 3;
    hyphenate-limit-lines: 2;
    hyphenate-limit-last: always;
    hyphenate-limit-zone: 8%;
}
</code></pre></div></figure>

<h3 id="blockquotes">Blockquotes</h3>

<p>The <code>blockquote</code> element represents a section that is being quoted from another source. The following is a single paragraph:</p>

<blockquote>
  <p>Democracy is a system of government where the citizens exercise power by voting. In a direct democracy, the citizens as a whole form a governing body and vote directly on each issue.</p>
</blockquote>

<p>Multiple paragraphs:</p>

<blockquote><p>Many forms of Government have been tried, and will be tried in this world of sin and woe. No one pretends that democracy is perfect or all-wise. Indeed, it has been said that democracy is the worst form of government except all those other forms that have been tried from time to time.</p><p>This is a second paragraph within the quotation, indented unlike the non-quoted paragraphs.</p></blockquote>

<p>A blockquote in quotes with a citation:</p>

<blockquote class="quoted">
  <p>One more attribute the modern typographer must have: the capacity for taking great pains with seemingly unimportant detail. To them, one typographical point must be as important as one inch, and they must harden their heart against the accusation of being too fussy.</p>
  <footer>— Hans P. Schmoller, in ‘Book Design Today’, <cite>Printing Review</cite>, 1951</footer>
  </blockquote>

<h3>Ordered&nbsp;list</h3>

<p>The <code>ol</code> element denotes an numbered list.</p>

<ol>
<li>This is an ordered list. This is an ordered list. This is an ordered list. This is an ordered list. This is an ordered list.</li>
<li>This is the second item, which contains a sub list

<ol>
<li>This is the sub list, which is also ordered.</li>
<li>It has two items.</li>
</ol></li>
<li>This is the final item on this list.</li></li>
</ol>

<h3>Unordered&nbsp;list</h3>

<p>The <code>ul</code> element denotes a bulleted list.</p>

<ul>
<li>This is an unordered list. This is an unordered list. This is an unordered list. This is an unordered list. </li></li>
<li>United Kingdom of Great Britain and Northern Ireland:

<ul>
<li>England</li>
<li>Scotland</li>
<li>Wales</li>
<li>Northern Ireland</li>
</ul></li>
<li>Republic of Ireland</li>
<li>Isle of Man</li>
<li>Channel Islands:

<ul>
<li>Bailiwick of Guernsey</li>
<li>Bailiwick of Jersey</li>
</ul></li>
</ul>

<p>Sometimes we may want each list item to contain block elements, typically a paragraph or two.</p>

<ul>
<li><p>This is a first paragraph in the list item. This is a first paragraph in the list item. This is a first paragraph in the list item. This is a first paragraph in the list item.</p>

<p>This is a second paragraph in the list item. This is a second paragraph in the list item. This is a second paragraph in the list item. This is a second paragraph in the list item.</p></li>
<li><p>The British Isles is an archipelago consisting of the two large islands of Great Britain and Ireland, and many smaller surrounding islands.</p></li>
<li><p>Great Britain is the largest island of the archipelago. Ireland is the second largest island of the archipelago and lies directly to the west of Great Britain.</p></li>
<li><p>The full list of islands in the British Isles includes over 1,000 islands, of which 51 have an area larger than 20 km<sup>2</sup>.</p></li>
</ul>

<h3>Definition&nbsp;list</h3>

<p>The <code>dl</code> element is for another type of list called a definition list. Instead of list items, the content of a <code>dl</code> consists of <code>dt</code> (Definition Term) and <code>dd</code> (Definition description) pairs.</p>

<dl>
    <dt>This is a term.</dt>
    <dd>This is the definition of that term, which both live in a <code>dl</code>.</dd>
    <dt>Here is another term.</dt>
    <dd>And it gets a definition too, which is this line.</dd>
    <dt>Here is term that shares a definition with the term below.</dt>
    <dt>Here is a defined term.</dt>
    <dd><code>dt</code> terms may stand on their own without an accompanying <code>dd</code>, but in that case they <em>share</em> descriptions with the next available <code>dt</code>. You may not have a <code>dd</code> without a parent <code>dt</code>.</dd>
</dl>

<h3>Figures</h3>

<p>Figures are usually used to refer to images.</p>

<!-- <figure>
    <img loading='lazy' src="/images/400×200.png" alt="Example image"/>
    <figcaption>
        This is a placeholder image, with supporting caption rendered in Plex Sans
    </figcaption>
</figure> -->

<p>This is a full bleed image using <code>class='fullbleed'</code> to make maximum use of the screen estate.</p>

<!-- <figure class="fullbleed">
    <img loading='lazy' src="/images/1200×300.png" alt="Example image"/>
    <figcaption>
        This is a full bleed placeholder image, with supporting caption
    </figcaption>
</figure> -->

<figure class='inline'>
<div class='inline-holder'>
<!-- <img loading='lazy' src="/images/200×300.png" alt="Example image"/> -->
<figcaption>This is an <code>inline</code> figure</figcaption></div></figure>

<p>The inline figure should be inside the text column on narrow screens (no wider than 50%). On wider screens it should be set outside the text column, off to the right.</p>

<h4>Here, a part of a poem is marked up using&nbsp;figure:</h4>

<figure>
    &#8216;Twas brillig, and the slithy toves<br/>
    Did gyre and gimble in the wabe;<br/>
    All mimsy were the borogoves,<br/>
    And the mome raths outgrabe.
    <figcaption>
        <cite>Jabberwocky</cite> (first verse). Lewis Carroll, 1832–98
    </figcaption>
</figure>

<h2>Text-level&nbsp;Semantics</h2>

<p>There are a number of inline <abbr title="HyperText Markup Language" class="smcp">HTML</abbr> elements you may use anywhere within other elements.</p>

<h3>Links&nbsp;and&nbsp;anchors</h3>

<p>This is a <a href="/">link</a>.</p>

<h3>Stressed&nbsp;emphasis</h3>

<p>This uses the <code>em</code> element for <em>emphasis</em>. This is <i>italicised</i> using an <code>i</code> element.</p>

<h3>Strong&nbsp;importance</h3>

<p>This uses the <code>strong</code> element for <strong>importance</strong>. This is <b>emboldened</b> using a <code>b</code> element.</p>

<h3>Strikethrough</h3>

<p>This uses the <code>s</code> element to <s>strike through</s>.</p>

<h3>Citations</h3>

<p>This uses the <code>cite</code> element to for a <cite>citation</cite>.</p>

<h3>Inline&nbsp;quotes</h3>

<p>This uses the <code>q</code> element to for a <q>quote</q>.</p>

<h3>Definition</h3>

<p>The <code>dfn</code> element is used to highlight the <dfn>first use of a term</dfn>.</p>

<h3>Abbreviation</h3>

<p>The <code>abbr</code> element is used for any abbreviated text, like <abbr title="Staffordshire">Staffs.</abbr> and <abbr class="c2sc">BBC</abbr>, the latter uses <code>class='c2sc'</code> to specify small-caps.</p>

<h3>Code</h3>

<p>The <code>code</code> element is used to represent fragments of computer code as we&#8217;ve seen through this page. It should be rendered in Inconsolata.</p>

<h3>Variable</h3>

<p>The <code>var</code> element is used to denote a <var>variable</var>.  It should be rendered in Inconsolata.</p>

<h3>Sample&nbsp;output</h3>

<p>The <code>samp</code> element is used to represent <samp>sample output</samp> from a program.  It should be rendered in Inconsolata.</p>

<h3>Keyboard&nbsp;entry</h3>

<p>The <code>kbd</code> element is used to denote <kbd>user input</kbd>.  It should be rendered in Inconsolata.</p>

<h3>Superscript and&nbsp;subscript&nbsp;text</h3>

<p>The <code>sup</code> element represents a superscript and the <code>sub</code> element represents a subscript. Example:
The coordinate of the i<sup>th</sup> point is (x<sub>i</sub>, y<sub>i</sub>). For example, the 10<sup>th</sup> point has coordinate (x<sub>10</sub>, y<sub>10</sub>).
f(x, n) = log<sub>4</sub>x<sup>n</sup></p>

<h3>Marked or&nbsp;highlighted&nbsp;text</h3>

<p>The <code>mark</code> element is used to represent a run of text marked or <mark>highlighted</mark> for reference purposes.</p>

<h3>Edits</h3>

<p>The <code>del</code> element is used to represent <del>deleted</del> or retracted text. The <code>ins</code> element, is used to represent <ins>inserted text</ins>.</p>

<h2>Tabular&nbsp;data</h2>

<p>Tables should be used when displaying tabular data. They are rendered in Plex Sans.</p>

<figure class="fig-table" role="region" aria-labelledby="TableCaption01" tabindex="0">
<table>
    <caption id="TableCaption01">The Very Best Eggnog</caption>
    <thead>
        <tr>
            <th scope="col">Ingredients</th>
            <th scope="col">Serves 12</th>
            <th scope="col">Serves 24</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Milk</td>
            <td>1 quart</td>
            <td>2 quart</td>
        </tr>
        <tr>
            <td>Cinnamon Sticks</td>
            <td>2</td>
            <td>1</td>
        </tr>
        <tr>
            <td>Vanilla Bean, Split</td>
            <td>1</td>
            <td>2</td>
        </tr>
        <tr>
            <td>Cloves</td>
            <td>5</td>
            <td>10</td>
        </tr>
        <tr>
            <td>Mace</td>
            <td>10 blades</td>
            <td>20 blades</td>
        </tr>
        <tr>
            <td>Egg Yolks</td>
            <td>12</td>
            <td>24</td>
        </tr>
        <tr>
            <td>Cups Sugar</td>
            <td>1 &frac12; cups</td>
            <td>3 cups</td>
        </tr>
        <tr>
            <td>Dark Rum</td>
            <td>1 &frac12; cups</td>
            <td>3 cups</td>
        </tr>
        <tr>
            <td>Brandy</td>
            <td>1 &frac12; cups</td>
            <td>3 cups</td>
        </tr>
        <tr>
            <td>Vanilla</td>
            <td>1 tbsp</td>
            <td>2 tbsp</td>
        </tr>
        <tr>
            <td>Half-and-half or Light Cream</td>
            <td>1 quart</td>
            <td>2 quart</td>
        </tr>
        <tr>
            <td>Freshly grated nutmeg to taste</td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
</figure>

<p>And this is a wide table to making maximum use of screen estate.</p>

<figure class="fig-table" role="region" aria-labelledby="TableCaption02" tabindex="0">
<table>
<caption id="TableCaption02">Font Rendering on Macs</caption>
<thead><tr><th rowspan="2" scope="col">Browser</th><th colspan="5" scope="row">Font Format</th></tr><tr><th>TrueType Mac</th><th>TrueType <abbr><abbr class='c2sc'>PC</abbr></abbr></th><th>PostScript</th><th>OpenType PostScript</th><th>OpenType TrueType</th></tr></thead><tbody><tr><th>Camino&nbsp;1.2</th><td class="yes">good</td><td class="yes">good</td><td class="yes">good</td><td class="yes">good</td><td class="yes">good</td></tr><tr><th>Safari 2</th><td class="yes">good</td><td class="yes">good</td><td class="yes">good</td><td class="yes">good</td><td class="yes">good</td></tr><tr><th>Firefox 2</th><td class="yes">good</td><td class="partial">correct italic &amp; bold fonts displayed; miscalculation of space required for italic, bold &amp; underlined fonts resulting in overlappping text</td><td class="no">not rendered</td><td class="partial">italic &amp; bold fonts synthesised; miscalculation of space required for italic, bold &amp; underlined fonts resulting in overlappping text</td><td class="partial">italic &amp; bold fonts synthesised; miscalculation of space required for italic, bold &amp; underlined fonts resulting in overlappping text</td></tr><tr><th>Opera 9</th><td class="yes">good</td><td class="partial">good, but italic font is synthetically obliqued</td><td class="no">not rendered</td><td class="partial">bold font not rendered; italic synthesised</td><td class="partial">bold font not rendered; italic synthesised</td></tr></tbody></table>
</figure>

<p>And this is some text to wrap it all up, mostly to make sure that there is a sensible margin between this and the table above.</p>
