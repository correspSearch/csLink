# csLink - Linking edited letters with correspSearch v2.0

The widget _csLink_ provides users with the opportunity
to not only explore a single letter of an online editon but also its interconnection
with other letters from the same letter network.

The widget can be included in an online edition to generate a link "Explore Network of Letters".
Depending on the values of the `data-` attributes, an overlay will pop over on
hovering the link and show a maximum of two other letters from the letter network.

In addition, links are provided to a complete list of the search query on <http://www.correspSearch.net>.
If a letter entry contains a valid URL reference, the search result will be linked
to the letter in its respective online edition.

The built files are located in the `dist`-folder.

## File structure

    index.html
contains the HTML code you have to include into your website
to create the link 'Explore Network of Letters', which serves
as the trigger for the widget.

    static/cslink_labels.js
contains the language-snippets needed for the different languages.

    cslink.js
contains the Application code. Do not change anything here.

## Setup the widget

1. Copy `css/cslink.css` into your respective folder for style sheets.
If you do not have such a folder, create a "css" folder in your root
directory and paste the `cslink.css` into that folder.
2. Copy `csLink.js` into your respective folder for JavaScript files.
If you do not have such a folder, create a "js" folder in your root directory
and paste the `csLink.js` into that folder.
3. Copy the complete `<div id=csLink>`-Tag of the widget to the place, where you want
the link to appear.
4. Copy the `<script>`-Tag and paste it _below_ the `<div>` you pasted in Step 3.
Change the path according to the location of the JavaScript file (`csLink.js`), you copied in Step 2.
5. Change the values of the data attributes in the widget's `<div>` according
to your needs.


## Setup the attributes

_Do not change the `id` attribute for the widget to work!_

### Required

    data-correspondent-1-id
Authority File URI for the first correspondent.

    data-start-date
Starting date for search (YYYY-MM-DD). If only one date is given, data-selection-span
is obsolete.

    data-range
Range of days that are included in the search. Depending on the value of data-selection-when,
the range is either added after, before, after and before a date, or after and before a timespan. 
If the timespan provided by the edition is greater than `data-range` the timespan will be used without any addition.

    date-selection-when
Determines, when the range shall be added to the given date. Possible values:
* `before`
* `after`
* `before-after`
Required, when only a date is given, can be left blank with a timespan.

	date-selection-span
Determines the temporal search direction when a timespan is given. Possible values:
* `fromStart`: Results taken from the start of a timespan
* `fromEnd`: Results taken from the end of a timespan
* `random`: Picks random results in a timespan
* `median-before`: Results taken from before the median of a timespan
* `median-after`: Results taken from after the median of a timespan
* `median-before-after`: Results taken from before and after the median of a timespan
Required, when a timespan is given, can be left blank with a single date.

    date-result-max
Determines the total maximum of results (for both correspondents together) to show.
When an odd number is given, one more result is shown for the first correspondent.
Minimum is `1`.

### Optional

    data-correspondent-1-name
Name of the first correspondent.

Required, if Authority File URI does _not_ link to an Authority File from GND.
If left blank and Authority File URI refers to an Authority File from GND,
the widget will get the correspondent's `preferred-name` from GND.
If left blank and the Authority file URI does not link to GND, no name will be shown.

    data-correspondent-2-id
Authority File URI for the second correspondent.

    data-correspondent-2-name
Name of the second correspondent.

Required, if Authority File URI does _not_ link to an Authority File from GND.
If left blank and Authority File URI refers to an Authority File from GND,
the widget will get the correspondent's `preferred-name` from GND.
If left blank and the Authority file URI does not link to GND, no name will be shown.

    data-end-date
Ending date for search (YYYY-MM-DD).

    data-exclude-edition
`xml:id` of the edition to be excluded from search. Multiple ids separated by comma.

    data-language
Language of the widget. Can be `en` or `de`, if left blank, `de` is chosen as the default language.

### Register a callback function

The widget fires an event `resultsExist`, to which it is possible to register a callback function. 
`resultsExist` fires once on initialization and then whenever changes are detected in the results-property. 
`e.details.results`, contains a boolean that returns `false`, if no results have been found, and `true`, if results are available.
To listen for that event, you can for example wrap the widget in a `<div id="wrapper">` and add an `eventListener`:
```js
    const wrapper = document.getElementById('wrapper');
    wrapper.addEventListener("resultsExist", function (e) {
        console.log("Got results? ", e.detail.results);
    });
```

## Credits

Developer: Jonas Müller-Laackman & Steven Sobkowski
Concept & Prototype: Stefan Dumont 

for the purpose of the DFG project `correspSearch - Briefeditionen vernetzen` at Berlin-Brandenburg Academy of Sciences and Humanities (BBAW).

If you use this software, please cite it using the metadata in the CFF file.

## Contact

correspSearch@bbaw.de
https://correspSearch.net 

## License

Copyright (C) 2018-2023 Berlin-Brandenburg Academy of Sciences and Humanities.

csLink is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

csLink is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with csLink.  If not, see <http://www.gnu.org/licenses/>.