// 'use strict';

// (function() {
// 	// musics Controller Spec
// 	describe('MusicsController', function() {
// 		// Initialize global variables
// 		var musicsController,
// 			scope,
// 			$httpBackend,
// 			$stateParams,
// 			$location;

// 		// The $resource service augments the response object with methods for updating and deleting the resource.
// 		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
// 		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
// 		// When the toEqualData matcher compares two objects, it takes only object properties into
// 		// account and ignores methods.
// 		beforeEach(function() {
// 			jasmine.addMatchers({
// 				toEqualData: function(util, customEqualityTesters) {
// 					return {
// 						compare: function(actual, expected) {
// 							return {
// 								pass: angular.equals(actual, expected)
// 							};
// 						}
// 					};
// 				}
// 			});
// 		});

// 		// Then we can start by loading the main application module
// 		beforeEach(module(ApplicationConfiguration.applicationModuleName));

// 		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
// 		// This allows us to inject a service but then attach it to a variable
// 		// with the same name as the service.
// 		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
// 			// Set a new global scope
// 			scope = $rootScope.$new();

// 			// Point global variables to injected services
// 			$stateParams = _$stateParams_;
// 			$httpBackend = _$httpBackend_;
// 			$location = _$location_;

// 			// Initialize the musics controller.
// 			musicsController = $controller('MusicsController', {
// 				$scope: scope
// 			});
// 		}));

// 		it('$scope.find() should create an array with at least one music object fetched from XHR', inject(function(musics) {
// 			// Create sample music using the musics service
// 			var samplemusic = new Musics({
// 				title: 'An music about MEAN',
// 				content: 'MEAN rocks!'
// 			});

// 			// Create a sample musics array that includes the new music
// 			var samplemusics = [samplemusic];

// 			// Set GET response
// 			$httpBackend.expectGET('musics').respond(samplemusics);

// 			// Run controller functionality
// 			scope.find();
// 			$httpBackend.flush();

// 			// Test scope value
// 			expect(scope.musics).toEqualData(samplemusics);
// 		}));

// 		it('$scope.findOne() should create an array with one music object fetched from XHR using a musicId URL parameter', inject(function(musics) {
// 			// Define a sample music object
// 			var samplemusic = new Musics({
// 				title: 'An music about MEAN',
// 				content: 'MEAN rocks!'
// 			});

// 			// Set the URL parameter
// 			$stateParams.musicId = '525a8422f6d0f87f0e407a33';

// 			// Set GET response
// 			$httpBackend.expectGET(/musics\/([0-9a-fA-F]{24})$/).respond(samplemusic);

// 			// Run controller functionality
// 			scope.findOne();
// 			$httpBackend.flush();

// 			// Test scope value
// 			expect(scope.music).toEqualData(samplemusic);
// 		}));

// 		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(musics) {
// 			// Create a sample music object
// 			var samplemusicPostData = new Musics({
// 				title: 'An music about MEAN',
// 				content: 'MEAN rocks!'
// 			});

// 			// Create a sample music response
// 			var samplemusicResponse = new Musics({
// 				_id: '525cf20451979dea2c000001',
// 				title: 'An music about MEAN',
// 				content: 'MEAN rocks!'
// 			});

// 			// Fixture mock form input values
// 			scope.title = 'An music about MEAN';
// 			scope.content = 'MEAN rocks!';

// 			// Set POST response
// 			$httpBackend.expectPOST('musics', samplemusicPostData).respond(samplemusicResponse);

// 			// Run controller functionality
// 			scope.create();
// 			$httpBackend.flush();

// 			// Test form inputs are reset
// 			expect(scope.title).toEqual('');
// 			expect(scope.content).toEqual('');

// 			// Test URL redirection after the music was created
// 			expect($location.path()).toBe('/musics/' + samplemusicResponse._id);
// 		}));

// 		it('$scope.update() should update a valid music', inject(function(musics) {
// 			// Define a sample music put data
// 			var samplemusicPutData = new Musics({
// 				_id: '525cf20451979dea2c000001',
// 				title: 'An music about MEAN',
// 				content: 'MEAN Rocks!'
// 			});

// 			// Mock music in scope
// 			scope.music = samplemusicPutData;

// 			// Set PUT response
// 			$httpBackend.expectPUT(/musics\/([0-9a-fA-F]{24})$/).respond();

// 			// Run controller functionality
// 			scope.update();
// 			$httpBackend.flush();

// 			// Test URL location to new object
// 			expect($location.path()).toBe('/musics/' + samplemusicPutData._id);
// 		}));

// 		it('$scope.remove() should send a DELETE request with a valid musicId and remove the music from the scope', inject(function(musics) {
// 			// Create new music object
// 			var samplemusic = new Musics({
// 				_id: '525a8422f6d0f87f0e407a33'
// 			});

// 			// Create new musics array and include the music
// 			scope.musics = [samplemusic];

// 			// Set expected DELETE response
// 			$httpBackend.expectDELETE(/musics\/([0-9a-fA-F]{24})$/).respond(204);

// 			// Run controller functionality
// 			scope.remove(samplemusic);
// 			$httpBackend.flush();

// 			// Test array after successful delete
// 			expect(scope.musics.length).toBe(0);
// 		}));
// 	});
// }());