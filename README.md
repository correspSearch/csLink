# csLink - Linking edited letters with correspSearch.
v1.0.1

The widget _csLink_ provides users with the opportunity
to not only explore a single letter of an online editon but also its interconnection
with other letters from the same letter network.

The widget can be included in an online edition to generate a link "Explore Network of Letters".
Depending on the values of the `data-` attributes, an overlay will pop over on
hovering the link and show a maximum of two other letters from the letter network.

In addition, links are provided to a complete list of the search query on <http://www.correspSearch.net>.
If a letter entry contains a valid URL reference, the search result will be linked
to the letter in its respective online edition.

## File structure

All required files are found in the `dist`-folder.

    index.html
contains the HTML code you have to include into your website
to create the link 'Explore Network of Letters', which serves
as the trigger for the widget.

    static/css/app.css
contains the standard Bootstrap style information.

    static/js/app.js
contains the Application code. Do not change anything here.

## Setup the widget

1. Copy `static/css/app.css` into your respective folder for style sheets. If you do not have such a folder, create a "css" folder in your root directory and paste the app.css into that folder.
2. Create a link to that style sheet in the header of your HTML file.
3. Copy `static/js/app.js` into your respective folder for JavaScript files.
   If you do not have such a folder, create a "js" folder in your root
   directory and paste the app.js into that folder.
4. Copy the complete `<div>`-Tag of the widget to the place, where you want
   the link to appear.
5. Copy the `<script>`-Tag and paste it _below_ the `<div>` you pasted in Step 3.
   Change the path according to the location of the JavaScript file,
   you copied in Step 3.
6. Change the values of the data attributes in the widget's `<div>` according
   to your needs.

## Setup the attributes
_Do not change the `id` attribute for the widget to work!_

### Required
    data-correspondent-1-id
Authority File URI for the first correspondent.

    data-correspondent-2-id
Authority File URI for the second correspondent.

    data-start-date
Starting date for search (YYYY-MM-DD).

    data-end-date
Ending date for search (YYYY-MM-DD).

### Optional
    data-correspondent-1-name
Name of the first correspondent (case-sensitive).

Required, if `data-search-by` is "name", blank, or Authority File URI
does _not_ link to an Authority File from GND. If left blank and Authority File URI refers to an Authority File from GND,
the widget will get the correspondent's `preferred-name` from GND.
If left blank and the Authority file URI does not link to GND, no name will be shown.

    data-correspondent-2-name
Name of the second correspondent (case-sensitive).

Required, if `data-search-by` is "name", blank, or Authority File URI
does _not_ link to an Authority File from GND. If left blank and Authority File URI refers to an Authority File from GND,
the widget will get the correspondent's `preferred-name` from GND.
If left blank and the Authority file URI does not link to GND, no name will be shown.

    data-exclude-edition
`xml:id` of the edition to be excluded from search. Multiple ids divided by comma.

## Copyright
Developed by
Jonas Müller-Laackman
jonas.mueller-laackman@bbaw.de

for the purpose of the DFG project
`correspSearch - Briefeditionen vernetzen`
at Berlin-Brandenburg Academy of Sciences and Humanities (BBAW).

Copyright (C) 2018 Berlin-Brandenburg Academy of Sciences and Humanities.

## License

Copyright (C) 2018 Berlin-Brandenburg Academy of Sciences and Humanities.

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
