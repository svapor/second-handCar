/**
 * ===================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * ===================================================================
 *
 * Test file to ensure Mock.js functionality is working. In order to run this 
 * test you need to install 'Node.js' and the 'Vows' module.
 *
 * - npm install vows
 * 
 * @package Mock.js
 * @author  Chris Brand <chris@cainsvault.com>
 * @license http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

var vows = require('vows'), assert = require('assert');

// Get the code to test
require('../src/mock.js')

// Set up the suite
var suite = vows.describe('Mock.js');


// Test basic spy functionality
suite.addBatch({
	"Create a method spy": {
		topic: function() {

			var arr = new Array();
			var mock = Mock.Spy(arr, "push");
			arr.push("element");

			return mock;
		},
		"Assertions callable": {
			"Get method count": function(topic) {
				assert.equal(topic.called(), 1);
			},
			"Get method arguments": function(topic) {
				assert.deepEqual(topic.calledWith(), ["element"]);
			},
			"Get method returned": function(topic) {
				assert.equal(topic.returnedWith(), 1);
			}
		},
		"Assert only instance and not global": {
			"Expect method to be called only once": function(topic) {
				var arr = new Array();
				arr.push("element2");

				assert.equal(topic.called(), 1);
			}
		}
	}
});

// Test spy on methods not directly part of the flow
suite.addBatch({
	"Spy on indirect method execution": {
		topic: function() {

			function TestObject()
			{
				this.methodOne = function()
				{
					this.methodTwo();
				}

				this.methodTwo = function()
				{
					return "done";
				}
			}

			var obj = new TestObject();
			var mock = Mock.Spy(obj, "methodTwo");
			
			obj.methodOne();

			return mock;
		},
		"methodTwo() called": {
			"Called once": function(topic) {
				assert.equal(topic.called(), 1);
			},
			"Method result = 'done'": function(topic) {
				assert.equal(topic.returnedWith(), 'done');
			}
		}
	}
});

// Test spy consume() abilities. This overrides default method behaviour
suite.addBatch({
	"Spy on global method Math.random()": {
		topic: function() {

			var spy = Mock.Spy(Math, "random");

			return spy;
		},
		"Math.random() called": {
			"Called once": function(topic) {
				Math.random();
				assert.equal(topic.called(), 1);
			},
			"Called with specified result": function(topic) {
				topic.consume(10);
				Math.random();
				assert.equal(topic.returnedWith(), 10);
			},
			"Called with correct result after release": function(topic) {
				topic.release();
				var result = Math.random();
				assert.notEqual(result, topic.returnedWith);
			}
		}
	}
});

// Test spy consumeWithFake() abilities. This overrides default method behaviour with a method
suite.addBatch({
	"Spy on global method Math.ceil()": {
		topic: function() {

			var spy = Mock.Spy(Math, "ceil");

			return spy;
		},
		"Math.ceil() called": {
			"Called once": function(topic) {
				Math.ceil();
				assert.equal(topic.called(), 1);
			},
			"Called with specified fake method": function(topic) {
				topic.consumeWithFake(function(num) {
					return num + 3;
				});
				Math.ceil(4.5);
				assert.equal(topic.returnedWith(), 7.5);
			},
			"Called with correct result after release": function(topic) {
				topic.release();
				var result = Math.ceil(4.5);
				assert.notEqual(result, topic.returnedWith);
			}
		}
	}
});

// Test spy event trigger and listeners
suite.addBatch({
	"Test event listeners": {
		topic: function()
		{
			var testGlobals = {"triggered": false};

			return testGlobals;
		},
		"Add and trigger a 'create' event": {
			"Add 'created' event listener": function(topic) {
				
				Mock.created(function(spy)
				{
					topic.triggered = true;	
				});

				assert.ok(true);
			},
			"Trigger 'created' event'": function(topic) {

				var spy = Mock.Spy(Math, "random");

				assert.equal(topic.triggered, true);
			}
		}
	}
});

suite.export(module);