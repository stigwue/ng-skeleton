# ng-skeleton

AngularJS skeleton.

Source code can be found here: [stigwue/ng-skeleton](https://github.com/stigwue/ng-skeleton).

## Installation

After pulling the code, one would need npm, gulp and bower tools installed.

```
bower install
npm install
```

These will install all necessary dependencies (some might be older versions, feel free to update if you wish).

## Running

Go into the directory and run **gulp serve**. It should start in your default browser.

## AngularJS Cheatsheet

From lessons gleaned from the Udemy's Ultimate AngularJS: Build a Real-World App from Scratch tutorial.


### New Project

```
npm install angular
```

This works for other dependencies too e.g http-server, angular-ui-router


### Tags

**ng-app**

App module specification.

**ng-init**

Initialises a variable (use assignment in quotes).

**ng-controller**

Specifies controller, scoped variables will then be accessible.

**ng-model**

Ties an input control to a variable.

**ng-repeat**

Repeats a particular tag with a changing alias.

**ng-src**

Makes an img tag (or some other resource which takes a src) use an angular variable's value.

**ng-show, ng-hide, ng-click**

Tag's hidden state (or variable value in case of ng-click) is changed based on the attribute's value.

**ng-change**

Is triggered when the input tag it is attached to changes value.

```javascript
<input ng-change="triggeredFunction()" >
```

**ui-view** / **ui-sref**

Enabled after installing and including angular-ui-router, manages application states from parsing the url. Works in hand with configs in the app module.

These states can then be called from ui-sref's. Note that in code, **state.go** can be used to go directly to a state.

### Formats
#### Modules

```javascript
angular.module("app_name", ["other_libraries_used"]);
```
#### Controllers

```javascript
//IIFY functions which do not pollute the scope
(function(){
    "use strict";

    angular
        .module("app_name") //must match with defined in module
        .controller("controller_name", function ($scope, $http){

        //assign $scope.foo_bar to variables or objects
        $scope.foo_bar = {
            property: 'value'
        };
        //foo_bar.property will then be accessible in the view (html)

        //$http for requests (POSTs, GETs, PUTs and DELETEs)
        //they return promises because of asynchronousity

        $http.get('url_local_or_remote').then(function (data_received) {
        	//use data_received
        });

    })
})();
```
#### Binding controllers to states

Has the benefit of avoiding scope soup.

```javascript
.state('state_id', {
    url : '/state_url',
    //templateUrl : 'link_to.html',
    template : '{{ aliasController.some_property }}',
    controller : 'specificController as aliasController'
})

.controller("specificController", function() {
	var ctrl = this;

	ctrl.some_property = some_value;
});
```

#### Directives

Shortcut to utilities wrapped in tags or inserted as attributes. **Note** that it turns camel cases to kebab cases.

```javascript
angular
	.directive("directiveName", function() {
	return {
		scope : {
			internal_property : '=paramter_from_view'
		},
		template : 'output stuff like: {{ internal_property }}',
		controller : foobarController,
		controllerAs : "vm"
	}
});
```
In the view, this becomes:

```html
<directive-name parameter_from_view="some value here"></directive-name>
```

If **internal_property** and **parameter_from_view** were the same, we could just use:

```javascript
internal_property : '='
```

Note that the **=** sign in the internal_property of scope is for variable. Also available is **@** for attribute string and **&** for callback binding.

#### Filters

Filters modifiy how data is displayed. Examples include currency, uppercase, date and so on.

```javascript
{{ some_variable | filter_type [ : 'option'] }}
```

#### Factories (Services)

```javascript
//IIFY functions which do not pollute the scope
(function(){
    "use strict";

    angular
        .module("app_name") //must match with defined in module
        .factory("directive_name", function ($http){
        	return {
        		property: value
        	}
        });

    })
})();
```

#### ui-router States (ui-view/ ui-sref)

```javascript
.config(function ($some_provider) {
//routing

$some_provider
    .state('first_state', {
        url : '/some_url',
        //templateUrl also works
        template : 'some template, can also include ui-srefs to toggle a tested state'
    })

    .state('first_state.nested', {
        url : '/some_other_url/:param1',
        templateUrl : 'link_to_template.html',
        //this property can be filled when this state is being called
        params : {
        	some_object : null
        }
    })

})
```

And then, to send variables to states:

```javascript
$state.$go('destinationState', {
	//parameters to new state
	param1 : param1_value,
	some_object : value
});
```

#### Timeouts

Provided by the timeout injection

```javascript
$timeout(function() {
	//do some stuff
}, time_in_milliseconds);
```

#### Watchers

Provided by the scope injection. It watches a variable and performs actions after.

```javascript
$scope.$watch('value_expected_to_change', function (changed_value) {
	if (changed_value === 'foo') {
		console.log('value is now foo');
	}
})
```

#### Scope emission and broadcasting

Broadcast sends data to child (listening) scopes while emit sends data to parent scopes.

To emit a message:

```javascript
$scope.$emit('messageIdentifier', 'messageValue_or_object');
```

To receive the message:

```javascript
$scope.$on('messageIdentifier', function (event, messageReceived){
	//do something with messageReceived
})
```
