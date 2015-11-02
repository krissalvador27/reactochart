import React from 'react/addons';
const {TestUtils} = React.addons;
import d3 from 'd3';

import jsdom from 'mocha-jsdom';
import {expect} from 'chai';


import {XYPlot, LineChart} from '../src/index.js';

const getXYArrayValue = {
    // accessors for getting (X, Y) data from simple arrays-of-arrays that look like [[x, y], [x, y]]
    x: d => d[0],
    y: d => d[1]
};


describe('LineChart', () => {
    var $;
    jsdom();

    const linearYScale = d3.scale.linear().domain([0, 1]).range([100, 0]);

    before(function() {
        $ = require('jquery')(window);
    });

    it('renders a line with number X & Y scales', () => {
        // make simple number-number line chart with 3 datapoints
        const props = {
            scale: {
                x: d3.scale.linear().domain([0, 2]).range([0, 100]),
                y: linearYScale
            },
            getValue: getXYArrayValue,
            data: [[0, 0.5], [1, 1], [2, 0.25]]
        };

        // ensure line is drawn as expected
        var chart = TestUtils.renderIntoDocument(<LineChart {...props} />);
        var path = TestUtils.findRenderedDOMComponentWithTag(chart, 'path');
        const pathData = path.getDOMNode().getAttribute('d');
        expect(pathData).to.equal('M 0 50 L 50 0 L 100 75');
    });

    it('renders a line with time X scale and number Y scale', () => {
        // make simple number-time line chart with 3 datapoints
        const props = {
            scale: {
                x: d3.time.scale().range([0,100])
                    .domain([new Date('2015-01-01T00:00:00.000Z'), new Date('2015-01-03T00:00:00.000Z')]),
                y: linearYScale
            },
            getValue: getXYArrayValue,
            data: [
                [new Date('2015-01-01T00:00:00.000Z'), 0.5],
                [new Date('2015-01-02T00:00:00.000Z'), 1],
                [new Date('2015-01-03T00:00:00.000Z'), 0.25]
            ]
        };

        // ensure line is drawn as expected
        var chart = TestUtils.renderIntoDocument(<LineChart {...props} />);
        var path = TestUtils.findRenderedDOMComponentWithTag(chart, 'path');
        const pathData = path.getDOMNode().getAttribute('d');
        expect(pathData).to.equal('M 0 50 L 50 0 L 100 75');
    });

    it('renders a line with ordinal X scale and number Y scale', () => {
        // make simple number-time line chart with 3 datapoints
        const props = {
            scale: {
                x: d3.scale.ordinal().domain(['a','b','c']).rangePoints([0,100]),
                y: linearYScale
            },
            getValue: getXYArrayValue,
            data: [['a', 0.5], ['b', 1], ['c', 0.25]]
        };

        // ensure line is drawn as expected
        var chart = TestUtils.renderIntoDocument(<LineChart {...props} />);
        var path = TestUtils.findRenderedDOMComponentWithTag(chart, 'path');
        const pathData = path.getDOMNode().getAttribute('d');
        expect(pathData).to.equal('M 0 50 L 50 0 L 100 75');
    });

    it('renders a line chart within an XYPlot', () => {
        const xyProps = {width: 100, height: 100};
        const lineProps = {
            getValue: getXYArrayValue,
            data: [[0, 0.5], [1, 1], [2, 0.25]]
        };

        //console.log(document);
        //console.log(window.document);

        //return;

        var chart = TestUtils.renderIntoDocument(
            <XYPlot {...xyProps}>
                <LineChart {...lineProps} />
            </XYPlot>
        );
        var path = TestUtils.findRenderedDOMComponentWithTag(chart, 'path');
        const pathData = path.getDOMNode().getAttribute('d');
        console.log(pathData);
    })
});