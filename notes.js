//Empty state 
// first need to inialize as null

vm.firstThing = null;
vm.secondThing = null;



vm.initializing = function() {
	return (vm.firstThing == null) || (vm.seconThing == null)
}

vm.emptyState = function() {
	if(vm.initializing()) {
		return false;
	} else if (vm.firstThing == 0 && vm.secondThing == 0) {
		return true;
	} else {
		return false;
	}
}

<div ng-hide = "vm.inializing()">
	<div class="empty-state" ng-if="vm.emptyPasge() == true">
	...
</div>
