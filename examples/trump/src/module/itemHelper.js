var itemHelper = {
	remove: function(item) {
		if(item === undefined) {
			item = this ;
		}

    var index = $Z.item().indexOf (this) ;  
    $Z.item().splice (index, 1) ; // remove item[itemName] from vizflow itemlist  
  }
} ;
