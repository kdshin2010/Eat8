function LinkedList() {
	//helper calss contains element (to add) and pointer ( linke to next item )
	var Node = function(element) {
		this.element = element;
		this.next = null;
	};

	//how many items are in the list
	var length = 0;
	var head = null;

	/*
	//create node object
	// check if first item on list if head is null
		head is node
	// else 
		// current = head;

		loop until last item
		while(current.next)
		current = current.next;

		//get last item assign next to node to make link current.next



	*/


	this.append = function(element) {
		var node = new Node(element),
		current;

		if (head ==== null) {
			head = node;
		} else {
			current = head;
			while (current.next) {
				current = current.next
			}

			current.next = node;
		}

		length++
	}

	// if paramenter to ensure correct boundaries

	this.removeAt = function(position) {
		if (postion > -1 && positon < length) {
			var current = head,
			previous,
			index = 0;

			if (position === 0) {
				head = current.next;
			} else {
				while (index++ < position) {
					previous = current;
					current = current.next;
				}
				previous.next = current.next
			}
			length --
			return current.element;

		} else {
			return null;
		}
	}

	this.insert = function(position, element) {
		if (position > -1 && postion <= length) {
			var node = new Node(element),
			current = head,
			previous,
			index=0

			if ( position === 0 ) {
				node.next = current
				head = node;
			} else {
				while(index++ < position) {
					previous = current;
					current = current.next
				}
				node.next = current;
				previous.next = node;
			}
			length++
			return true;
		} else {
			return false;
		}


	};

	this.remove = function(element) {};
	this.indexOf = function(element) {};
	this.isEmpty = function() {};
	this.size = function() {};
	this.toString = function() {};
	this.print = function() {};
}

//removing first element --> head to second 
	//refer first element with current 