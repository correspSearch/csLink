/*

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

*/

<template>
  <div>
    <a href="#"
       id="exploreCorrespSearch"
       v-bind:class="(results[0].length === 0 && results[1].length === 0) ? 'noLink' : ''"
       v-on:mouseover="triggerPopover">Briefnetz erkunden <font-awesome-icon icon="share-alt" />
    </a>

    <b-popover class="cslink"
               target="exploreCorrespSearch"
      	       placement="bottom"
               triggers="manual"
               ref="exploreCorrespSearchPopup"
               v-if="results[0].length !== 0 || results[1].length !== 0">
      <b-tabs>
        <b-tab title="Briefe"
               class="pt-3"
               active>
          <div v-if="results[0].length > 0">
            <b-alert variant="danger"
                     v-bind:show="this.correspondent1Id === ''">Keine Norm-ID für Sender angegeben.</b-alert>
            <p v-if="this.correspondent1Id !== ''">Briefe von oder an <strong>{{ this.names[0] }}</strong> im selben Zeitraum in anderen Editionen:</p>
            <b-list-group v-if="this.correspondent1Id !== ''">
              <b-list-group-item v-for="(result, key) in results[0]"
                                 v-bind:key="key">
              <a v-bind:href="result.link"
                 target="_blank"
                 v-if="result.link !== null">
                <strong>{{ result.sender }}</strong> an <strong>{{ result.addressee }}</strong>{{ (result.place) ? ', ' + result.place : ''}}{{ (result.date) ? ', ' + result.date : '' }}
              </a>
              <div v-if="result.link === null">
                <strong>{{ result.sender }}</strong> an <strong>{{ result.addressee }}</strong>{{ (result.place) ? ', ' + result.place : ''}}{{ (result.date) ? ', ' + result.date : '' }}
              </div>
              </b-list-group-item>
            </b-list-group>
            <a v-bind:href="links[0]"
               target="_blank"
               v-if="this.correspondent1Id !== ''">Alle Nachweise in correspSearch ansehen</a>
          </div>
          <hr v-if="results[0].length > 0 && results[1].length > 0" />
          <div v-if="results[1].length > 0">
            <b-alert variant="danger"
                     v-bind:show="this.correspondent2Id === ''">Keine Norm-ID für Addressat angegeben.</b-alert>
            <p v-if="this.correspondent2Id !== ''">Briefe von oder an <strong>{{ this.names[1] }}</strong> im selben Zeitraum in anderen Editionen:</p>
            <b-list-group v-if="this.correspondent2Id !== ''">
              <b-list-group-item v-for="(result, key) in results[1]"
                                 v-bind:key="key">
              <a v-bind:href="result.link"
                 v-if="result.link !== null"
                 target="_blank">
                 <strong>{{ result.sender }}</strong> an <strong>{{ result.addressee }}</strong>{{ (result.place) ? ', ' + result.place : ''}}{{ (result.date) ? ', ' + result.date : '' }}
              </a>
              <div v-if="result.link === null">
                <strong>{{ result.sender }}</strong> an <strong>{{ result.addressee }}</strong>{{ (result.place) ? ', ' + result.place : ''}}{{ (result.date) ? ', ' + result.date : '' }}
              </div>
              </b-list-group-item>
            </b-list-group>
            <a v-bind:href="links[1]"
               target="_blank"
               v-if="this.correspondent2Id !== ''">Alle Nachweise in correspSearch ansehen</a>
          </div>
          <hr v-if="results[0].length > 0 || results[1].length > 0" />
          <small>Diese Verknüpfungen werden automatisiert bereitgestellt über <a href="http://www.correspsearch.net" target="_blank">correspSearch</a>.</small>
        </b-tab>
        <b-tab title="Korrespondenten"
               class="pt-3">
          <b-table small
            	     v-bind:fields="tableField"
                   v-bind:items="network"
                   sort-by="letters"
                   v-bind:sort-desc="sortDesc">
            <template slot="name"
                      slot-scope="data">
              <a v-bind:href="data.value.url">{{ data.value.name }}</a>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </b-popover>
  </div>
</template>

<script>
export default {
  // Props
  props: {
    correspondent1Name: String,
    correspondent2Name: String,
    correspondent1Id: String,
    correspondent2Id: String,
    startDate: String,
    endDate: String,
    range: {
      type: String,
      default: '30',
    },
    selectionWhen: String,
    selectionSpan: String,
    resultMax: {
      type: String,
      default: '2',
    },
    excludeEdition: String,
  },
  data() {
    return {
      // Results
      results: [[], []],

      // Names to be shown in the header
      names: [this.correspondent1Name, this.correspondent2Name],

      // Links that lead to a complete list of results at correspSearch
      links: [[], []],

      // List for Names
      network: [],
      tableField: [{
        key: 'name',
        label: 'Name',
      }, {
        key: 'letters',
        label: 'Briefe',
      }],
      sortDesc: true,
    };
  },
  methods: {
    // Trigger popover manually with a mouseleave event
    triggerPopover() {
      if (!(this.results[0].length === 0 && this.results[1].length === 0)) {
        this.$root.$emit('bv::show::popover', 'exploreCorrespSearch');
        document.getElementsByClassName('popover')[0].addEventListener('mouseleave', () => {
          this.$root.$emit('bv::hide::popover', 'exploreCorrespSearch');
        });
      }
    },

    // Transform yyyy-mm-dd to dd.mm.yyyy
    locale(date, format = 'YYYY-MM-DD') {
      switch (format) {
        case 'YYYY':
          return date.toLocaleDateString('de-DE', { year: 'numeric' });
        case 'YYYY-MM':
          return date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
        case 'YYYY-MM-DD':
        default:
          return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }
    },

    // Get preferred names from GND by using Lobid API
    async getNames(target) {
      // check if given IDs are gnd, otherwise do nothing
      // TODO: Solution for other Authority Files?
      if (this[`correspondent${target}Id`].includes('http://d-nb.info/gnd')) {
        const query = `https://lobid.org/gnd/${this[`correspondent${target}Id`].split('/')[this[`correspondent${target}Id`].split('/').length - 1]}.json`;
        const response = await fetch(query);
        const data = await response.json();
        return data.preferredName;
      } return null;
    },

    setNames(target) {
      this.getNames(target).then((data) => {
        this.$nextTick(() => {
          this.$set(this.names, (target - 1), data);
        });
      });
    },

    // Transform Date
    getDate(date) {
      let d = '';
      if (date.when) {
        d = this.locale(new Date(Date.parse(date.when)));
      } else if (date.from) {
        const from = this.locale(new Date(Date.parse(date.from)));
        const to = this.locale(new Date(Date.parse(date.to)));
        d = `zwischen ${from} und ${to}`;
      } else if (date.notBefore) {
        let notBefore = '';
        if (date.notBefore.length === 4) notBefore = this.locale(new Date(Date.parse(date.notBefore)), 'YYYY');
        if (date.notBefore.length === 7) notBefore = this.locale(new Date(Date.parse(date.notBefore)), 'YYYY-MM');
        if (date.notBefore.length === 10) notBefore = this.locale(new Date(Date.parse(date.notBefore)), 'YYYY-MM-DD');
        let notAfter = '';
        if (date.notAfter.length === 4) notAfter = this.locale(new Date(Date.parse(date.notAfter)), 'YYYY');
        if (date.notAfter.length === 7) notAfter = this.locale(new Date(Date.parse(date.notAfter)), 'YYYY-MM');
        if (date.notAfter.length === 10) notAfter = this.locale(new Date(Date.parse(date.notAfter)), 'YYYY-MM-DD');
        d = `nicht vor ${notBefore}, nicht nach ${notAfter}`;
      }
      return d;
    },

    // Return Value depending on the type of the source
    retValDepType(source, key = '#text') {
      if (source) {
        if (typeof source === 'object') {
          // Case 1: Entry is an ordinary object with #text property
          if (Array.isArray(source)) {
            return source[0][key];
          } return source[key];
        } else if (typeof source === 'string') {
          // Case 2: Entry is a string for no other information but the name is available.
          return source;
        // Case 3: Entry is an Array, meaning there are more than one persons. Only take the first in that case.
        } return source[0][key];
      } return '';
    },

    // Add to results
    addToResults(target, source) {
      this.results[(target - 1)].push({
        sender: this.retValDepType(source.correspAction[0].persName),
        addressee: this.retValDepType(source.correspAction[1].persName),
        place: this.retValDepType(source.correspAction[0].placeName),
        date: this.getDate(source.correspAction[0].date),
        link: (source.ref !== undefined && source.ref.includes('http://')) ? source.ref : null,
      });
    },
  },

  // Load first entries for occurrences in other letter editions
  created() {
    // Specify cmif to exclude
    const exclude = this.excludeEdition.replace(/ /g, '').split(',');

    // If there are no IDs given, don't perform a search, error will be shown on frontend
    [1, 2].forEach((target) => {
      if (this[`correspondent${target}Id`] !== '') {
        // Calculate range
        let start = (this.startDate === '')
          ? Date.parse(this.endDate)
          : Date.parse(this.startDate);
        let end = (this.endDate === '')
          ? Date.parse(this.startDate)
          : Date.parse(this.endDate);
        if (this.range !== '') {
          if ((this.start === this.end
              || this.startDate === ''
              || this.endDate === '')
              && this.selectionWhen !== '') {
            // When there is only one date, equal start and end date to that date with range
            switch (this.selectionWhen) {
              case 'before':
                start = new Date((start - (this.range * 86400000)));
                end = new Date(end);
                break;
              case 'after':
                start = new Date(start);
                end = new Date((end + (this.range * 86400000)));
                break;
              case 'before-after':
              default:
                start = new Date((start - (this.range * 86400000)));
                end = new Date((end + (this.range * 86400000)));
                break;
            }
          } else {
            start = new Date((start - (this.range * 86400000)));
            end = new Date((end + (this.range * 86400000)));
          }
          // transform to valid date format
          start = `${start.getFullYear()}-${((start.getMonth() + 1) < 10)
            ? `0${(start.getMonth() + 1)}`
            : (start.getMonth() + 1)}-${(start.getDate() < 10)
              ? `0${start.getDate()}`
              : start.getDate()}`;
          end = `${end.getFullYear()}-${((end.getMonth() + 1) < 10)
            ? `0${(end.getMonth() + 1)}`
            : (end.getMonth() + 1)}-${(end.getDate() < 10)
              ? `0${end.getDate()}`
              : end.getDate()}`;
        }
        // If there are no names given as attributes, get the preferred Name from GND, only works with related authority files
        if (this[`correspondent${target}Name`] === '') this.setNames(target);
        // NOTE: FOR IE Support use XHR instead of fetch()
        console.info(`https://correspsearch.net/api/v1.1/tei-json.xql?correspondent=${this[`correspondent${target}Id`]}&startdate=${start}&enddate=${end}`);
        fetch(`https://correspsearch.net/api/v1.1/tei-json.xql?correspondent=${this[`correspondent${target}Id`]}&startdate=${start}&enddate=${end}`).then((response) => {
          response.json().then((json) => {
            if (json.teiHeader.profileDesc !== null) {
              // Get a list of all involved correspondents
              for (let i = 0; i < json.teiHeader.profileDesc.correspDesc.length; i += 1) {
                const correspondents = [
                  {
                    name: {
                      name: this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, '#text'),
                      url: (this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref').includes('http://')
                       || this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref').includes('https://'))
                       ? `https://correspsearch.net/search.xql?correspondent=${this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref')}&startdate=${start}&enddate=${end}`
                       : null,
                    },
                    gnd: this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref'),
                    letters: 0,
                  }, {
                    name: {
                      name: this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, '#text'),
                      url: (this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref').includes('http://')
                       || this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref').includes('https://'))
                       ? `https://correspsearch.net/search.xql?correspondent=${this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref')}&startdate=${start}&enddate=${end}`
                       : null,
                    },
                    gnd: this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref'),
                    letters: 0,
                  },
                ];

                // Form an array of persons
                correspondents.forEach((c) => {
                  let exists = false;
                  for (let j = 0; j < this.network.length; j += 1) {
                    if (this.network[j].gnd === c.gnd) {
                      exists = true;
                      break;
                    }
                  }
                  if (!exists) this.network.push(c);
                });
              }

              // Evaluate the amount of correspondences
              for (let i = 0; i < json.teiHeader.profileDesc.correspDesc.length; i += 1) {
                for (let j = 0; j < this.network.length; j += 1) {
                  if (this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.network[j].gnd
                      || this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.network[j].gnd) {
                    this.network[j].letters += 1;
                  }
                }
              }

              // Calculate where result-fetching routine has to stop, in case of odd max result numbers, show more for the first correspondent
              let stopAt = this.resultMax / 2;
              if (this.resultMax % 2 !== 0) {
                stopAt = (target === 1)
                  ? (Math.floor(this.resultMax / 2) + (this.resultMax % 2))
                  : Math.floor(this.resultMax / 2);
              }
              // Case: Timespan
              // Case: Selection from the start of the timespan
              if (this.selectionSpan === 'fromStart') {
                for (let i = 0; i < json.teiHeader.profileDesc.correspDesc.length; i += 1) {
                  if (i === stopAt) break;
                  if (!exclude.includes(json.teiHeader.profileDesc.correspDesc[i].source)) {
                    if (
                        !(this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent1Id
                        && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent2Id
                      ) && !(
                        this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent1Id
                        && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent2Id)
                      ) {
                      if (
                        this[`correspondent${target}Id`]
                        === this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref')
                        || this[`correspondent${target}Id`]
                        === this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref')
                      ) {
                        this.addToResults(target, json.teiHeader.profileDesc.correspDesc[i]);
                      }
                    }
                  } else if (i < stopAt) stopAt += 1;
                  this.links[(target - 1)] = `http://correspsearch.bbaw.de/search.xql?correspondent=${this[`correspondent${target}Id`]}&startdate=${start}&enddate=${end}&l=de`;
                }
              }
              // Case: Selection from the end of the timespan
              if (this.selectionSpan === 'fromEnd') {
                stopAt = json.teiHeader.profileDesc.correspDesc.length - stopAt;
                for (let i = (json.teiHeader.profileDesc.correspDesc.length - 1); i > -1; i -= 1) {
                  if (i < stopAt) break;
                  if (!exclude.includes(json.teiHeader.profileDesc.correspDesc[i].source)) {
                    if (
                        !(this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent1Id
                        && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent2Id
                      ) && !(
                        this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent1Id
                        && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent2Id)
                      ) {
                      if (
                        this[`correspondent${target}Id`]
                        === this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref')
                        || this[`correspondent${target}Id`]
                        === this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref')
                      ) {
                        this.addToResults(target, json.teiHeader.profileDesc.correspDesc[i]);
                      }
                    }
                  } else if (i >= stopAt) stopAt -= 1;
                  this.links[(target - 1)] = `http://correspsearch.bbaw.de/search.xql?correspondent=${this[`correspondent${target}Id`]}&startdate=${start}&enddate=${end}&l=de`;
                }
              }
              // Case: Random selection
              if (this.selectionSpan === 'random') {
                const sort = [];
                if (json.teiHeader.profileDesc.correspDesc.length > this.resultMax) {
                  while (sort.length < stopAt) {
                    let num = Math.floor((Math.random() * json.teiHeader.profileDesc.correspDesc.length));
                    if (num >= json.teiHeader.profileDesc.correspDesc.length) num -= 1;
                    if (!sort.includes(num)) {
                      if (!exclude.includes(json.teiHeader.profileDesc.correspDesc[num].source)) {
                        if (
                            !(this.retValDepType(json.teiHeader.profileDesc.correspDesc[num].correspAction[0].persName, 'ref') === this.correspondent1Id
                            && this.retValDepType(json.teiHeader.profileDesc.correspDesc[num].correspAction[1].persName, 'ref') === this.correspondent2Id
                          ) && !(
                            this.retValDepType(json.teiHeader.profileDesc.correspDesc[num].correspAction[1].persName, 'ref') === this.correspondent1Id
                            && this.retValDepType(json.teiHeader.profileDesc.correspDesc[num].correspAction[0].persName, 'ref') === this.correspondent2Id)
                          ) {
                          if (
                            this[`correspondent${target}Id`]
                            === this.retValDepType(json.teiHeader.profileDesc.correspDesc[num].correspAction[0].persName, 'ref')
                            || this[`correspondent${target}Id`]
                            === this.retValDepType(json.teiHeader.profileDesc.correspDesc[num].correspAction[1].persName, 'ref')
                          ) {
                            sort.push(num);
                          }
                        }
                      }
                    }
                  }
                } else {
                  for (let i = 0; i < json.teiHeader.profileDesc.correspDesc.length; i += 1) {
                    if (!exclude.includes(json.teiHeader.profileDesc.correspDesc[i].source)) {
                      if (
                          !(this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent1Id
                          && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent2Id
                        ) && !(
                          this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent1Id
                          && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent2Id)
                        ) {
                        if (
                          this[`correspondent${target}Id`]
                          === this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref')
                          || this[`correspondent${target}Id`]
                          === this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref')
                        ) {
                          sort.push(i);
                        }
                      }
                    }
                  }
                }
                for (let i = 0; i < json.teiHeader.profileDesc.correspDesc.length; i += 1) {
                  if (sort.includes(i)) {
                    this.addToResults(target, json.teiHeader.profileDesc.correspDesc[i]);
                  }
                  this.links[(target - 1)] = `http://correspsearch.bbaw.de/search.xql?correspondent=${this[`correspondent${target}Id`]}&startdate=${start}&enddate=${end}&l=de`;
                }
              }
              // Case: Selection from Median
              if (this.selectionSpan.includes('median')) {
                let median = 0;
                const length = (json.teiHeader.profileDesc.correspDesc.length === undefined) ? 0 : json.teiHeader.profileDesc.correspDesc.length;
                if (Date.parse(start) < 0 && Date.parse(end) < 0) {
                  let m = Math.abs(Date.parse(start) - Date.parse(end));
                  m = Date.parse(start) + Math.floor(m / 2);
                  for (let i = 0; i < length; i += 1) {
                    const dateSource = json.teiHeader.profileDesc.correspDesc[i].correspAction[0].date;
                    let date = '';
                    if (dateSource.when !== undefined) date = dateSource.when;
                    if (dateSource.notBefore !== undefined) date = dateSource.notBefore;
                    if (dateSource.from !== undefined) date = dateSource.from;
                    date = Date.parse(date);
                    if (date > m) {
                      median = (i === 0) ? 0 : (i - 1);
                      break;
                    }
                  }
                }
                const results = [];
                let i = 0;
                let j = 0;
                if (median === 0 && (length === undefined)) {
                  if (!exclude.includes(json.teiHeader.profileDesc.correspDesc.source)) {
                    if (
                        !(this.retValDepType(json.teiHeader.profileDesc.correspDesc.correspAction[0].persName, 'ref') === this.correspondent1Id
                        && this.retValDepType(json.teiHeader.profileDesc.correspDesc.correspAction[1].persName, 'ref') === this.correspondent2Id
                      ) && !(
                        this.retValDepType(json.teiHeader.profileDesc.correspDesc.correspAction[1].persName, 'ref') === this.correspondent1Id
                        && this.retValDepType(json.teiHeader.profileDesc.correspDesc.correspAction[0].persName, 'ref') === this.correspondent2Id)
                      ) {
                      if (
                        this[`correspondent${target}Id`]
                        === this.retValDepType(json.teiHeader.profileDesc.correspDesc.correspAction[0].persName, 'ref')
                        ||
                        this[`correspondent${target}Id`]
                        === this.retValDepType(json.teiHeader.profileDesc.correspDesc.correspAction[1].persName, 'ref')
                      ) {
                        this.addToResults(target, json.teiHeader.profileDesc.correspDesc);
                      }
                    }
                  }
                } else {
                  if (this.selectionSpan === 'median-before-after') {
                    const step = [0, 0];
                    while (
                        (median + step[1] + 1) <= length
                        && ((median) - step[0]) >= 0
                    ) {
                      i = (median - step[0]);
                      if (i >= 0) {
                        if (exclude.includes(json.teiHeader.profileDesc.correspDesc[i].source)) {
                          step[0] += 1;
                        } else if (
                          (this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent1Id
                          && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent2Id
                        ) || (
                          this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent1Id
                          && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent2Id)
                        ) {
                          step[0] += 1;
                        } else {
                          results.push(i);
                          step[0] += 1;
                        }
                      }
                      if (results.length === stopAt) break;
                      j = (median + step[1] + 1);
                      if (j <= length) {
                        if (exclude.includes(json.teiHeader.profileDesc.correspDesc[j].source)) {
                          step[1] += 1;
                        } else if (
                          (this.retValDepType(json.teiHeader.profileDesc.correspDesc[j].correspAction[0].persName, 'ref') === this.correspondent1Id
                          && this.retValDepType(json.teiHeader.profileDesc.correspDesc[j].correspAction[1].persName, 'ref') === this.correspondent2Id
                        ) || (
                          this.retValDepType(json.teiHeader.profileDesc.correspDesc[j].correspAction[1].persName, 'ref') === this.correspondent1Id
                          && this.retValDepType(json.teiHeader.profileDesc.correspDesc[j].correspAction[0].persName, 'ref') === this.correspondent2Id)
                        ) {
                          step[1] += 1;
                        } else {
                          results.push(j);
                          step[1] += 1;
                        }
                      }
                      if (results.length === stopAt) break;
                    }
                    results.sort();
                  }
                  if (this.selectionSpan === 'median-before') {
                    i = median;
                    for (i; (i >= (median - stopAt)) && (i >= 0); i -= 1) {
                      if (exclude.includes(json.teiHeader.profileDesc.correspDesc[i].source)) {
                        stopAt += 1;
                      } else if (
                          !(this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent1Id
                          && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent2Id
                        ) && !(
                          this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent1Id
                          && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent2Id)
                        ) {
                        results.push(i);
                      } else {
                        stopAt += 1;
                      }
                    }
                    results.sort();
                    results.reverse();
                  }
                  if (this.selectionSpan === 'median-after') {
                    for (i = median; (i < (median + stopAt)) && (i < length); i += 1) {
                      if (exclude.includes(json.teiHeader.profileDesc.correspDesc[i].source)) {
                        stopAt += 1;
                      } else if (
                          !(this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent1Id
                          && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent2Id
                        ) && !(
                          this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[1].persName, 'ref') === this.correspondent1Id
                          && this.retValDepType(json.teiHeader.profileDesc.correspDesc[i].correspAction[0].persName, 'ref') === this.correspondent2Id)
                        ) {
                        results.push(i);
                      } else {
                        stopAt += 1;
                      }
                    }
                    results.sort();
                  }
                }
                results.forEach((e) => {
                  if (!exclude.includes(json.teiHeader.profileDesc.correspDesc[e].source)) {
                    this.addToResults(target, json.teiHeader.profileDesc.correspDesc[e]);
                  }
                  this.links[(target - 1)] = `http://correspsearch.bbaw.de/search.xql?correspondent=${this[`correspondent${target}Id`]}&startdate=${start}&enddate=${end}&l=de`;
                });
              }
            }
          });
        });
      }
    });
  },
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap-reboot.scss';
@import '../node_modules/bootstrap/scss/_tables.scss';
@import '../node_modules/bootstrap/scss/_nav.scss';
.persList {
  list-style-type: none;
  padding-left: 10px;
}
.persList li {
  margin-top: 5px;
}
.noLink {
  display: none !important;
}
table {
  margin-top: 10px;
  font-size: 0.8rem;
}
</style>
