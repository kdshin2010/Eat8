function LinkedList() {
	//helper calss contains element (to add) and pointer ( linke to next item )
	var Node = function(element) {
		this.element = element;
		this.next = null;
	};

	//how many items are in the list
	var length = 0;
	var head = null;

	this.append = function(element) {
		var node = new Node(element),
		current;

		if(head === null) {
			head = node;
		} else {
			current = head;
			//loop until you find last item
			while(current.next) {
				current = current.next;
			}
		}
	};



	this.insert = function(position, element) {

		//check out of bounds values;
		if (position >=0 && position <= length) {
			var node = new Node(element),
			current = head;
			previous,
			index = 0;

			if (position === 0) {
				node.next = current;
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
			return false
		}
	};

	this.removeAt = function(position) {};
	this.remove = function(element) {};
	this.indexOf = function(element) {};
	this.isEmpty = function() {};
	this.size = function() {};
	this.toString = function() {};
	this.print = function() {};
}


//Node Helper class
	//item to add to the list
	//contains element with value to add add
		//next attribute (pointer with link to next node item)
