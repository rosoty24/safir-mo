;(function($) {
  'use strict';

  // Class definition
  // ==============================

  var Octofilter = function(element, options) {
    this.$input   = $(element);
    this.options  = options;
    this.init();
  };

  Octofilter.defaults = {
    source: {},
    categories: {},
    paramName: 'query',
    minChars: 3
  };

  Octofilter.prototype.cacheData = {};
  Octofilter.prototype.currentData = {};
  Octofilter.prototype.selectedFilters = {};

  Octofilter.prototype.init = function() {
    var self = this;

    self.$input.attr({ autocomplete: 'off' });
    self.$container = self.$input.wrap('<div class="select1"/>').parent();

    // Focus when click on input container
    self.$container.on('click', function() {
      self.$input.focus();
    });

    self.$input
      .on('focus', function() {
        self.$filtersContainer.show();
      })

      .on('keydown', function(event) {
        switch (event.keyCode || event.which) {
          // Return if tab is pressed
          case 9:
          case 13:
            event.preventDefault();
            break;
          // Clear the last filter if backspace is pressed
          case 8:
            if (!this.value.length) {
              self.clear(self.$container.find('.octofilter-label:last').data('value'));
            }
            break;
          // Clear search if esc is pressed
          case 27:
            self.$input.val('').blur();
            self.$filtersContainer.hide();
            break;
        }
      })

      .on('keyup', function(event) {
        switch (event.keyCode || event.which) {
          // Enter and tab
          case 9:
          case 13:
            var $filter = self.$filtersContainer.find('.octofilter-link.octofilter-active:first'); // Finds the first active filter
            if ($filter.length) {
              self.select($filter.data('value'));
            }
            break;
          default:
            if (this.value.length >= self.options.minChars) {
              self.search(this.value);
            } else {
              self.search('');
            }
        }
      });

    // Make the initial search
    // Triggerable filter events
    self.search('', function() {
      // Select filter
      self.$filtersContainer.on('click', '.octofilter-link', function(event) {
        event.preventDefault();
        event.stopPropagation();

        console.log('FILTER!!');
        self.select($(this).data('value'));
        var fiterValue=($(this).data('value'));
        var string=Session.get('fiterValue');
        string=string+':'+fiterValue;
        Session.set('fiterValue',string);

        console.log('CHANGING FILTER'+Session.get('fiterValue'));

      });

      // Clear filter
      self.$container.on('click', '.octofilter-clear', function(event) {
        event.preventDefault();
        event.stopPropagation();

        console.log('SUPPRIMER START');
        console.log("FILTER BEFORE:"+Session.get('fiterValue'));
        var toRemove=$(this).closest('.octofilter-label').data('value');
        var oldValue=Session.get('removefilter');
        var newVal=oldValue+':'+toRemove;
        Session.set('removefilter',newVal);
        console.log('A SUPPRIMER='+Session.get('removefilter'));
        
        
        var liste=newVal.split(':');
        var myFilter=Session.get('fiterValue');
      for(var i=0;i<liste.length;i++){
        console.log("processing:"+liste[i]);
        if(liste[i]=='')
          continue;
        var str=':'+liste[i];
        myFilter=myFilter.replace(str,'');
      }
      


      Session.set('fiterValue',myFilter);
      Session.set('removefilter','');
      console.log("FILTER APRES:"+Session.get('fiterValue'));


        self.clear($(this).closest('.octofilter-label').data('value'));
      });

      // When you click outside of filter area, it should hide
      $(document).on('click', function(event) {
        var $target  = $(event.target),
            $parents = $target.parents().add($target);

        if ($parents.index(self.$container) === -1 && $parents.index(self.$filtersContainer) === -1) {
          self.$filtersContainer.hide();
        }
      });
    });
  };

  Octofilter.prototype.makeFilterContainer = function() {
    var self = this;

    if (!self.$filtersContainer) {
      self.$filtersContainer = $(
        '<div class="octofilter-container"><div class="col-md-12"><p class="purchased text-right">Peoples who: <span class="purchased">Purchased</span> </p></div>' +
          '<ul class="col-xs-4 col-sm-2 col-lg-3 nav"></ul>' +
          '<div class="col-xs-4 col-sm-4 col-lg-9 tab-content"></div>' +
        '</div>'
      ).insertAfter(self.$input);
    }

    var containerNav = [];

    for (var category in self.options.categories) {
      var label = self.options.categories[category];
      containerNav.push(
        '<li>' +
          '<a href="#octofilter-' + category + '" class="nav-' + category + '" data-toggle="tab">' + label + '</a>' +
        '</li>'
      );
    }

    self.$filtersContainer
      .find('.nav').html(containerNav)
      .find('li:first').addClass('active');
  };

  Octofilter.prototype.populateFilterContainer = function(data) {
    var self = this;

    data = $.extend({}, data); // Cloning the data

    if ($.isEmptyObject(self.options.categories)) {
      $.each(data, function(key) {
        self.options.categories[key] = key;
      });

      self.makeFilterContainer();
    }

    var containerContent = [],
        inputContains = function(category) {
          var name = category.name || category.value || category;
          return name.toLowerCase().indexOf(self.$input.val().toLowerCase()) !== -1;
        };

    self.currentData = {};

    for (var category in self.options.categories) {
      if (typeof data[category] === 'string') {
        data[category] = $.parseJSON(data[category]);
      }

      // Performs the search and returns the values found
      if (self.$input.val().length >= self.options.minChars) {
        data[category] = $.grep(data[category], inputContains);
      }

      var filters = [];

      if (data[category].length) {
        for (var item in data[category]) {
          var klass = 'octofilter-link',
              value = item.name || item.value || data[category][item];

          if ($.inArray(value, self.selectedFilters[category]) !== -1) {
            klass += ' octofiltered';
          }

          filters.push($('<a/>', { text: value, 'class': klass, 'data-category': category, 'data-value': value }));
        }

        self.currentData[category] = data[category];
      } else {
        filters.push($('<span/>', { text: self.options.categories[category].toLowerCase() + ' not found.', 'class': 'octofilter-not-found' }));
      }

      containerContent.push($('<div/>', { id: 'octofilter-' + category, 'class': 'tab-pane' }).html(filters));
    }

    self.$filtersContainer.find('.tab-content').html(containerContent);

    var $firstFilter = self.$filtersContainer.find('.octofilter-link:not(.octofiltered):first'); // Return the first filter which isn't filtered

    // Define what is the active tab
    var tabActive;

    if ($firstFilter.length) {
      tabActive = $firstFilter.closest('.tab-pane').addClass('active');
    } else {
      tabActive = self.$filtersContainer.find('.tab-pane:first').addClass('active');
    }

    self.$filtersContainer.find('[href="#' + tabActive.attr('id') + '"]').tab('show');

    // Define the active link
    if (self.$input.val().length >= self.options.minChars) {
      $firstFilter.addClass('octofilter-active');
    }
  };

  Octofilter.prototype.search = function(query, callback) {
    if (this.cacheData[query]) {
      this.populateFilterContainer(this.cacheData[query]);

      // Callbacks
      if (typeof callback === 'function') { callback(); }
      this.$input.trigger('octofilter.search', [this.cacheData[query]]);
    } else {
      if (typeof this.options.source === 'string') {
        var self = this,
            params = {};

        params[this.options.paramName] = query;

        $.getJSON(this.options.source, params, function (data) {
          self.cacheData[query] = data; // Stores the query in cache

          if (!self.$filtersContainer) { self.makeFilterContainer(); }
          self.populateFilterContainer(data);

          // Callbacks
          if (typeof callback === 'function') { callback(); }
          self.$input.trigger('octofilter.search', [data]);
        });
      } else {
        if (!this.$filtersContainer) { this.makeFilterContainer(); }
        this.populateFilterContainer(this.options.source);

        // Callbacks
        if (typeof callback === 'function') { callback(); }
        this.$input.trigger('octofilter.search', [this.currentData]);
      }
    }
  };

  Octofilter.prototype.select = function(value) {
    var self = this,
        $filter = self.$filtersContainer.find('.octofilter-link[data-value="' + value + '"]'),
        category = $filter.data('category');

    // Return when the filter isn't selected
    if ($.inArray(value, self.selectedFilters[category]) !== -1) {
      self.$input.focus();
      return;
    }

    if (!self.selectedFilters[category]) { self.selectedFilters[category] = []; }
    self.selectedFilters[category].push(value); // Store the selected value

    var $filterLabel = $('<span/>', { 'class': 'octofilter-label', text: $filter.text(), 'data-value': value, 'data-category': category });
    $('<a/>', { 'class': 'octofilter-clear', html: '&times;' }).appendTo($filterLabel);

    var $filtersLabels = self.$container.find('.octofilter-label');

    // Add filter in selecteds filters
    if ($filtersLabels.length) {
      $filtersLabels.last().after($filterLabel);
    } else {
      self.$container.prepend($filterLabel);
    }

    // Clear input value and seach
    self.$input.val('').focus();
    self.search('');

    // Callback
    self.$input.trigger('octofilter.select', [self.selectedFilters]);
  };

  Octofilter.prototype.clear = function(value) {
    var self = this,
        removedFilter = {};

    if (!value) {
      self.$container.find(".octofilter-label").remove();
      self.selectedFilters = {};
      self.$input.val('');
    } else {
      var $filterLabel = self.$container.find('.octofilter-label[data-value="' + value + '"]').remove(),
          category = $filterLabel.data('category');

      removedFilter[category] = self.selectedFilters[category].splice(self.selectedFilters[category].indexOf(value), 2); // Clean the filters selected
    }

    self.$input.focus();
    self.search(self.$input.val()); // Remake the search to clear the filter

    // Callbacks
    self.$input.trigger('octofilter.clear', [removedFilter]);
  };

  $.fn.octofilter = function(option) {
    return this.each(function() {
      var $this   = $(this),
          data    = $this.data('octofilter'),
          options = $.extend({}, Octofilter.defaults, $this.data(), typeof option === 'object' && option);

      if (!data) { $this.data('octofilter', new Octofilter(this, options)); }
      if (typeof option === 'string') { data[option](); }
    });
  };

  $.fn.octofilter.Constructor = Octofilter;

})(window.jQuery);
