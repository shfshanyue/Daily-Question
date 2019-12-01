'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var test = require('tape');
var forEach = require('foreach');
var debug = require('object-inspect');

var v = require('./helpers/values');

test('export', function (t) {
	t.equal(typeof GetIntrinsic, 'function', 'it is a function');
	t.equal(GetIntrinsic.length, 2, 'function has length of 2');

	t.end();
});

test('throws', function (t) {
	t['throws'](
		function () { GetIntrinsic('not an intrinsic'); },
		SyntaxError,
		'nonexistent intrinsic throws a syntax error'
	);

	forEach(v.nonBooleans, function (nonBoolean) {
		t['throws'](
			function () { GetIntrinsic('%', nonBoolean); },
			TypeError,
			debug(nonBoolean) + ' is not a Boolean'
		);
	});

	t.end();
});

test('base intrinsics', function (t) {
	t.equal(GetIntrinsic('%Object%'), Object, '%Object% yields Object');
	t.equal(GetIntrinsic('%Array%'), Array, '%Array% yields Array');

	t.end();
});

test('dotted paths', function (t) {
	t.equal(GetIntrinsic('%Object.prototype.toString%'), Object.prototype.toString, '%Object.prototype.toString% yields Object.prototype.toString');
	t.equal(GetIntrinsic('%Array.prototype.push%'), Array.prototype.push, '%Array.prototype.push% yields Array.prototype.push');

	t.end();
});
