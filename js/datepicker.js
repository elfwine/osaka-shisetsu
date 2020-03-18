/**
* Custom Date Select
* @author Fujitelecom Ltd.
* @version 1.0
* @requires jQuery 1.8+
*/
(function($) {
	// Default options
	$.datepicker = {
		templates: {
			selector: function(opts) {
				var html = '<div class="modal bottom fade" id="' + opts.handlerId + '" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="' + opts.handlerId + '">' +
					'<div class="modal-dialog modal-dialog-centered modal-date" role="document" >' +
						'<div class="modal-content">' +
							'<div class="modal-header cyan">' +
								'<div class="date-display"></div>' +
								'<div class="date-btn">' +
									'<button class="prev-month" type="button"><i class="fas fa-chevron-up"></i></button>' +
									'<button class="next-month" type="button"><i class="fas fa-chevron-down"></i></button>' +
								'</div>' +
							'</div>' +
							'<div class="modal-body py-1 px-2">' +
								'<div class="container-fluid m-0 p-0 modal-date-body">' +
									'<div class="row row-dp row-weekday">' +
										'<div class="col col-dp" scope="col"><div class="dp-weekday sun">' + opts.strings.days[0] + '</div></div>' +
										'<div class="col col-dp" scope="col"><div class="dp-weekday">' + opts.strings.days[1] + '</div></div>' +
										'<div class="col col-dp" scope="col"><div class="dp-weekday">' + opts.strings.days[2] + '</div></div>' +
										'<div class="col col-dp" scope="col"><div class="dp-weekday">' + opts.strings.days[3] + '</div></div>' +
										'<div class="col col-dp" scope="col"><div class="dp-weekday">' + opts.strings.days[4] + '</div></div>' +
										'<div class="col col-dp" scope="col"><div class="dp-weekday">' + opts.strings.days[5] + '</div></div>' +
										'<div class="col col-dp" scope="col"><div class="dp-weekday sat">' + opts.strings.days[6] + '</div></div>' +
									'</div>' +
									'<div class="row m-0 p-0 dp-body">' +
										'<div class="row row-dp">' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="modal-footer">' +
								'<div class="selected-display"></div>' +
								'<button type="button" class="btn btn-light m-0" data-dismiss="modal" aria-label="Close">' + opts.strings.closeText + ' <span aria-hidden="true">&times;</span></button>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
				return html;
			}
		},
		defaults: {
			formatDate: function(date) {
				//var formatted = date.getFullYear() + '-' + $.datepicker.pad(date.getDate(), 2) + '-' + $.datepicker.pad(date.getMonth() + 1, 2);
				//return formatted;
				return ('0000' + date.getFullYear()).substr(-4) + '-' + ('00' + (date.getMonth() + 1)).substr(-2) + '-' + ('00' + date.getDate()).substr(-2);
			},
			formatDateJp: function(date) {
				return ('0000' + date.getFullYear()).substr(-4) + '年' + ('00' + (date.getMonth() + 1)).substr(-2) + '月' + ('00' + date.getDate()).substr(-2) + '日';
			},
			parseDate: function(string) {
				var date = new Date();
				var dtArr = string.split('-');
				date = new Date(parseInt(dtArr[0]), parseInt(dtArr[1]-1), parseInt(dtArr[2]));
				//var parts = string.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
				//if (parts && parts.length == 4) {
				//if(
				//	date = new Date(parts[3], parts[2] - 1, parts[1]);
				//}
				return date;
			},
			callbacks: {
				onShow: function(widget) {
					// Do nothing
				},
				onHide: function(widget) {
					// Do nothing
				}
			},
			container: 'body',
			element: null,
			date: new Date().toDateString(),
			strings: {
				days: [ '日', '月', '火', '水', '木', '金', '土' ],
				months: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
				yearSuffix: '年',
				closeText: '閉じる'
				//days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				//months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			},
			handlerId : 'dateModal',
			startDate: new Date(),
			endDate: null
		},
		options: {},
		pad: function(num, size) {
			var s = num+"";
			while (s.length < size) s = "0" + s;
			return s;
		},
		todayDate: '',
		selectedDate: null,
		weekNoStart: null,
		yearSuffix: '',
		dateHandler: '',
		currentYearMonth: '',
		update: function(el, date, opts) {
			var dateDisplay = el.find('.date-display'),
				dpBody = el.get(0).querySelector('.dp-body'),
				rowDp = dpBody.querySelector('.row-dp'),
				curDay = date.getDate(),
				curWeekday = date.getDay(),
				curMonth = date.getMonth(),
				curYear = date.getFullYear();
				selDate = opts.formatDate(this.selectedDate);
			var sDate = new Date(this.selectedDate);
			sDate.setDate(1);
			var colEl = rowDp.querySelector('.dp-day[data-date="' + opts.formatDate(sDate) + '"]'),
			    colDp = colEl.parentNode,
			    index = Array.prototype.indexOf.call(colDp.parentNode.children, colDp); //Array.from(colDp.parentNode.children).indexOf(colDp);
			// update scroll position
			$(dpBody).animate({
				scrollTop: ((parseInt(index / 7) * 40))
			}, 'fast');
			//dpBody.scrollTop(parseInt(index / 7) * 40);
			$('.dp-day').removeClass('selected');
			el.find('.modal-footer .selected-display').text('');
			var today = new Date();
			if(this.selectedDate.setHours(0,0,0,0) != today.setHours(0,0,0,0)) {
				$('.dp-day[data-date="' + selDate + '"]').addClass('selected');
				el.find('.modal-footer .selected-display').text('選択：' + opts.formatDateJp(this.selectedDate));
			}
			dateDisplay.text( curYear + opts.strings.yearSuffix + opts.strings.months[curMonth]);
			
		},
		addDaysData: function(month, opts) {
			var today = new Date(), 
			    startDt = opts.startDate || today, 
			    endDt = opts.endDate || new Date(opts.startDate.getFullYear(), opts.startDate.getMonth() + 4, 0),
			    weekStartDay = new Date(startDt),
			    cDt = null , cls = '';
			today.setHours(0,0,0,0);
			weekStartDay.setDate(weekStartDay.getDate() - weekStartDay.getDay());
			
			var dpRow = $('.modal-date .dp-body .row-dp'),
			    firstCol = dpRow.children().first(),
			    firstColDt = opts.parseDate(firstCol.data('date'));
			
			
			if(month > 0) {
			
			} else if(month < 0) {
			
			}
		},
		removeDaysData: function(month, opts) {
			var dpRow = $('.modal-date .dp-body .row-dp');
		
		},
		initDaysData: function(opts) {
			var today = new Date(), 
			    startDt = opts.startDate || today, 
			    endDt = new Date(opts.endDate) || new Date(opts.startDate.getFullYear(), opts.startDate.getMonth() + 4, 0),
			    weekStartDay = new Date(startDt),
			    cDt = null , cls = '';
			today.setHours(0,0,0,0);
			weekStartDay.setDate(1);
			weekStartDay.setDate(weekStartDay.getDate() - weekStartDay.getDay());
			endDt.setDate(endDt.getDate() + (7 - endDt.getDay()));
			var dpRow = $('.modal-date .dp-body .row-dp');
			for (var d = new Date(weekStartDay); d <= endDt; d.setDate(d.getDate() + 1)) {
				cDt = new Date(d);
				cls = cDt.getDay() == 6 ? ' sat' : (cDt.getDay() == 0 ? ' sun' : '');
				if(today.setHours(0,0,0,0) == cDt.setHours(0,0,0,0)) {
					cls += ' today';
				}
				
				if(today.getMonth() != cDt.getMonth() || today.getTime() >= cDt.getTime()) {
					cls += ' om';
				}
				if(today.getTime() >= cDt.getTime()) {
				    cls += ' disabled';
				}
				dpRow.append(this.calDate(opts.formatDate(cDt), cDt.getDate(), cls));
			}
		},
		calDate: function(date, day, cls) {
			return '<div class="col col-dp" scope="col"><div class="dp-day' + cls + '" data-date="' + date + '">' + day + '</div></div>';
		},
		show: function(options) {
			var obj = this,
				opts = $.extend(true, {}, $.datepicker.options, options),
				markup = $('#' + opts.handlerId), //$(obj.templates.selector(opts)),
				date = new Date(opts.date);
			//if(opts.startDate) {
			//	opts.startDate.setDate(opts.startDate.getDate() - opts.startDate.getDay());
			//}
			// set yearSuffix
			obj.yearSuffix = opts.strings.yearSuffix;
			obj.dateHandler = opts.handlerId;
			obj.scrollTopPos = 0;
			// Initialize
			obj.init(opts);
			// Get rid of another popups
			//obj.hide(true);
			//markup.modal('hide');
			// Initialize value
			if(obj.selectedDate == null) {
				obj.selectedDate = new Date(opts.date);
			}
			if (opts.element) {
				if ( typeof opts.element == 'string' ) {
					opts.element = $(opts.element);
				}
				if(opts.element.is('input[type="text"]')) {
					if(opts.element.val() != '') {
						date = opts.parseDate(opts.element.val());
					}
				} else if (typeof opts.element.data('date') !== 'undefined') {
					//console.log('Selected Date value : ' + opts.element.data('date'));
					date = opts.parseDate(opts.element.data('date'));
					obj.selectedDate = opts.parseDate(opts.element.data('date'));
				}
			}
			// Update current selection
			obj.update(markup, date, opts);
			// Show
			markup.modal('show');
			markup.data('opts', opts);
		},
		hide: function(force) {
			/*
			var force = force || false,
				el = $('.date-picker'),
				opts = el.data('opts' || {});
			if (el.length) {
				if (force) {
					opts.callbacks.onHide(el);
					el.remove();
				} else {
					el.fadeOut(150, function() {
						opts.callbacks.onHide(el);
						el.remove();
					});
				}
			} */
			$('#' + this.dateHandler).modal('hide');
		},
		updateView: function() {
			var opts = this.options;
			var elems = this.elementsInView(document.querySelector('.modal-date .dp-body'));
			var grp = {}, sKey = '';
			$.each(elems, function(i, elem) {
				sKey = $(elem).data('date').substr(0, 7);
				$(elem).removeClass('om');
				//console.log(sKey);
				if("undefined" === typeof(grp[sKey])){
					grp[sKey] = 0;
				}
				grp[sKey] += 1;
			});
			//var keys = Object.keys(grp), values = Object.values(grp);
			var sLen = 0, bKey = '';
			for(var key in grp) {
				if(grp[key] > sLen) {
					sLen = grp[key];
					bKey = key;
				}
			}
			var cDate, today = this.todayDate;
			$.each(elems, function(i, elem) {
				cDate = $(elem).data('date');
				sKey = cDate.substr(0, 7)
				if(sKey != bKey || cDate <= today) {
					$(elem).addClass('om');
				}
			});
			var ym = bKey.split('-');
			$('.modal-date .date-display').text(ym[0] + opts.strings.yearSuffix + opts.strings.months[parseInt(ym[1])-1]);
			$.datepicker.currentYearMonth = bKey;
		},
		init: function(opts) {
			var obj = this;
			//	opts = $.extend(true, {}, $.datepicker.defaults, options);
				
			if($('#' + opts.handlerId).length == 0) {
				console.log('Init Datepicker');
				var markup = $($.datepicker.templates.selector(opts));
				var date = new Date(opts.date);
				var dDate = new Date(opts.date);
				dDate.setDate(1);
				obj.selectedDate = date;
				obj.weekNoStart = obj.weekNumber(dDate);
				obj.todayDate = opts.formatDate(new Date());
				$(opts.container).append(markup);
				var startDt = opts.startDate || new Date(), endDt = opts.endDate || new Date(opts.startDate.getFullYear(), opts.startDate.getMonth() + 4, 0);
				startDt.setDate(1);
				startDt.setDate(startDt.getDate() - startDt.getDay());
				this.initDaysData(opts);
				// Chevron-up click event
				markup.on('click', '.prev-month', function(e) {
					e.preventDefault();
					if($(this).prop('disabled')) {
						return false;
					}
					var dpBody = $('.modal-date .dp-body');
					var scTop = dpBody.scrollTop();
					if(scTop <= 0) {
						return false;
					}
					var cYm = obj.currentYearMonth, ym = cYm.split('-');
					date = new Date(parseInt(ym[0]), parseInt(ym[1])-1, 1);
					//date = obj.selectedDate;
					//date.setDate(1);
					date.setMonth( date.getMonth() - 1 );
					if(date.setHours(0,0,0,0) < startDt.setHours(0,0,0,0)) {
						date = new Date(startDt);
					}
					var colEl = dpBody.find('.dp-day[data-date="' + opts.formatDate(date) + '"]'),
						colDp = colEl[0].parentNode,
						index = Array.prototype.indexOf.call(colDp.parentNode.children, colDp),
						topPos = (parseInt(index / 7) * 40);
					//obj.selectedDate = (new Date(date));
					dpBody.animate({
				        scrollTop: topPos
				    }, 500);
				});
				// Chevron-down click event
				markup.on('click', '.next-month', function(e) {
					e.preventDefault();
					if($(this).prop('disabled')) {
						return false;
					}
					var dpBody = $('.modal-date .dp-body');
					var scTop = dpBody.scrollTop();
					if((scTop + 240) >= dpBody[0].scrollHeight) {
						return false;
					}
					var cYm = obj.currentYearMonth, ym = cYm.split('-');
					date = new Date(parseInt(ym[0]), parseInt(ym[1])-1, 1);
					//date = obj.selectedDate;
					//date.setDate(1);
					date.setMonth( date.getMonth() + 1 );
					if(date.setHours(0,0,0,0) > endDt.setHours(0,0,0,0)) {
						return false;
					}
					var colEl = dpBody.find('.dp-day[data-date="' + opts.formatDate(date) + '"]'),
						colDp = colEl[0].parentNode,
						index = Array.prototype.indexOf.call(colDp.parentNode.children, colDp),
						topPos = (parseInt(index / 7) * 40);
					//obj.selectedDate = (new Date(date));
					dpBody.animate({
				        scrollTop: topPos 
				    }, 500);
				});
				markup.on('click', '.btn-ok', function(e) {
					e.preventDefault();
					var formatted = opts.formatDate(date);
					$(opts.element).val(formatted);
					$(opts.element).trigger("change");
					obj.hide();
				});
				markup.on('click', '.btn-cancel', function(e) {
					e.preventDefault();
					obj.hide();
				});
				var dpBody = document.querySelector('.modal-date .dp-body');
				dpBody.addEventListener('scroll', this.onScroll, {passive: true});
				
				markup.on('click', '.dp-day', function(e) {
					e.preventDefault();
					obj.selectedDate = opts.parseDate($(this).data('date'));
					opts.callbacks.onHide($(this).data('date'));
					markup.modal('hide');
				});
				// 
				markup.on('show.bs.modal', function(e) {
					$('html').addClass('modal-open');
					opts.callbacks.onShow(markup);
				});
				markup.on('hide.bs.modal', function(e) {
					$('html').removeClass('modal-open');
					obj.selectedDate = null;
				});
			}
		},
		isScrolling: null,
		scrollTopPos: 0,
		onScroll: function(e) {
			window.clearTimeout(this.isScrolling);
			//console.log('Scroll Top Pos : ' + $.datepicker.scrollTopPos);
			$('.dp-day').addClass('scroll');
			this.isScrolling = setTimeout(function() {
				var scroll = e.target.scrollTop;
				$.datepicker.scrollTopPos = scroll;
				$('.dp-day').removeClass('scroll');
				$.datepicker.updateView();
			}, 66);
		},
		weekNumber: function(date) {
			var onejan = new Date(date.getFullYear(), 0, 1);
			return Math.ceil( (((date - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
		},
		elementsInView: function(container) {
		    //Get container properties
		    var cTop = container.scrollTop;
		    var cBottom = cTop + container.clientHeight;
		    //Get element properties
		    var eTop, eBottom, isTotal, isPartial;
		    var elemArr = [];
		    //console.log('Containter top: ' + cTop + ' , bottom : ' + cBottom);
		    //console.log($(container).find('.dp-day'));
		    $(container).find('.col-dp').each(function(i){
			    eTop = this.offsetTop;
			    eBottom = eTop + this.clientHeight;
			    //Check if in view    
			    isTotal = (eTop >= cTop && eBottom <= cBottom);
			    isPartial = ((eTop < cTop && eBottom > cTop) || (eBottom > cBottom && eTop < cBottom));
			    if(isTotal || isPartial) {
			    	elemArr.push(this.children);
			    }
		    });
		    //Return outcome
		    return  elemArr;
		}
	};
	// Manual binding
	$.fn.datepicker = function(options) {
		if (!this.length) { return this; }
		var opts = $.extend(true, {}, $.datepicker.defaults, options);
		$.datepicker.options = opts;
		// Add element to DOM
		//console.log('Init DateSelect Handler 1');
		$.datepicker.init(opts);
		this.each(function() {
			var el = $(this),
				parent = el.parent();
			// Bind to the element itself
			el.on('click', function() {
				$.datepicker.show({
					element: el
				});
			});
			// Does it have a button?
			/*
			parent.find('[data-toggle=select]').on('click', function(e) {
				e.preventDefault();
				if ( $('.date-picker:visible').length ) {
					$.datepicker.hide();
				} else {
					$.datepicker.show({
						element: el
					});
				}
			}); */
		});
		return this;
	};
	// Data support
	$('[data-select=date]').each(function() {
		var el = $(this);
		el.datepicker();
	});
})(jQuery);
