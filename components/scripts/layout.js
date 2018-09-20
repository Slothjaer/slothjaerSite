$(document).ready (function() {
	sizeSections ();
	initProjectNav ();
	initPersonalGallery ();
	initTimeline ();
	navLinks ();
	navCheck ();
	if ($(window).width() >= 600) {
		var s = sk.init();
	}
});



$(window).resize(function() {
	sizeSections ();
	if ($(window).width() >= 600) {
		var s = sk.init();
	} else {
		var s = sk.init().destroy();
	}
});
$( document).scroll(function() {
  	panelCheck ();
});
function sizeSections () {
	var navIconMaxHeight = $(window).height() / 15.2;
	$('li').css({
		'max-height': navIconMaxHeight+'px'
	});
	$('#welcome').height($(window).height()*2);
	if ($(window).height() > $(window).width()*.8) {
		$('#welcomeContent').height ($(window).height());
		
	} else {
		$('#welcomeContent').height ($(window).width()*.8);
	}
	$('#debugger').html ($('#welcome').height()+ " & "+$(window).height());
	$('.introSpace').height($(window).height()*1.2);
	
	if ($(window).width() > 1200) {
		var portfolioMinHeight = 3600
		
	} else {
		var portfolioMinHeight = $(window).width()*3;
	}
	if ($(window).width() > 600 ) {
		var professionalPortolioHeight = $(window).height() * 6;
		var personalPortfolioHeight = $(window).height() * 6;
	} else {
		var professionalPortolioHeight = $(window).height() * 5;
		var personalPortfolioHeight = $(window).height() * 5;
	}
	var experienceContentHeight = $(window).height() * 8;
	
	$('#professionalPortfolio').css ({
		'min-height': portfolioMinHeight+'px'
	}).outerHeight (professionalPortolioHeight);
	
	$('#personalPortfolio').css ({
		'min-height': portfolioMinHeight+'px'
	}).outerHeight (personalPortfolioHeight);
	
	$('#experienceContent').css ({
		'min-height': portfolioMinHeight+'px'
	}).outerHeight (experienceContentHeight);
	
	$('.project').height($(window).height()*.8);
	
	if ($(window).height() > $(window).width()) {
		var gridMaxWidth = ($(window).height() * .8) * (3/5);
	} else {
		var gridMaxWidth = ($(window).height() * .8) * (5/3);
	}
	$('.gridContainer').css ({
		'max-width': gridMaxWidth+'px'
	});
	
	$('.placeholder').height($(window).height()*.5);
	$('#timelinePlaceholder').height($(window).height()*4);
	
	var placeholder1_top = $('#profesionalPage_rightTree_top').width() * .55;
	var placeholder1_bot = parseInt($('#profesionalPage_rightTree_telescope').css('top'), 10) - placeholder1_top + ($(window).width()*.1);
	$('#profesionalPage_rightTree_treeSpacer1').css ({
		'top': placeholder1_top+'px'
	}).height(placeholder1_bot);
	
	var placeholder2_top = $('#profesionalPage_rightTree_telescope').width() * .55 + parseInt($('#profesionalPage_rightTree_telescope').css('top'), 10);
	var placeholder2_bot = parseInt($('#profesionalPage_rightTree_platform').css('top'), 10) - placeholder2_top + ($(window).width()*.1);
	$('#profesionalPage_rightTree_treeSpacer2').css ({
		'top': placeholder2_top+'px'
	}).height(placeholder2_bot);
	
	var placeholder3_top = $('#profesionalPage_rightTree_platform').width() * .75 + parseInt($('#profesionalPage_rightTree_platform').css('top'), 10);
	var placeholder3_bot = parseInt($('#profesionalPage_rightTree_base').css('top'), 10) - placeholder3_top + ($(window).width()*.15);
	$('#profesionalPage_rightTree_treeSpacer3').css ({
		'top': placeholder3_top+'px'
	}).height(placeholder3_bot);
	var bgTreeFiller_top = $('#profesionalPage_bgTree_top').width() * .55;
	var bgTreeFiller_bot = parseInt($('#profesionalPage_bgTree_base').css('top'), 10) - bgTreeFiller_top + ($(window).width()*.5);
	$('#profesionalPage_bgTree_spacer').css ({
		'top': bgTreeFiller_top+'px'
	}).height(bgTreeFiller_bot);
	var rockFiller_top = $('#personalPage_electroSloths_cliff').width() * .9;
	var rockFiller_bot = parseInt($('#personalPage_electroSloths').css('top'), 10) - rockFiller_top + ($(window).width()*.4);
	$('#personalPage_rockPattern_left').css ({
		'top': rockFiller_top+'px'
	}).height(rockFiller_bot);
	
	
	$('#workHistory').height ($(window).height()-45);
	if ($(window).height() > 600 && $(window).width() > 600) {
		$('.job').outerHeight ($(window).height()-260);
	} else {
		$('.job').outerHeight ($(window).height()-200);
	}
}
function panelCheck () {
	//Welcome content
	var windowPoint = $(window).scrollTop()+$(window).height();
	var welcomePoint = $('#welcome').offset().top+$('#welcome').height();
	var welcomeContentPoint = $('#welcome').offset().top+$('#welcomeContent').height();
	if (windowPoint < welcomeContentPoint) {
		$('#welcomeContent').css ({
				'position':'absolute',
				'top':'0',
				'bottom':'auto'
			});
	} else if (windowPoint < welcomePoint) {
		$('#welcomeContent').css ({
				'position':'fixed',
				'top':'auto',
				'bottom':'0'
			});
	} else {
		$('#welcomeContent').css ({
				'position':'absolute',
				'top':'auto',
				'bottom':'0'
			});
	}
	$('.introductionText').each (function () {
		var achorPoint = $(this).parent().offset().top+($('#professionalIntrospace').height()*.1);
		var windowPoint = $(window).scrollTop()+($(window).height()*.1);
		if (achorPoint  > windowPoint) {
			$(this).css ({
				'position':'absolute'
			});
		} else {
			$(this).css ({
				'position':'fixed'
			});
	}
	});
	
	timelineCheck ();
	navCheck();
}
function initProjectNav () {
	$('.blockContent').each (function () {
		$(this).parent().parent().find('.projectMenu').append ("<a class='menuButton'>"+($(this).index()+1)+"</a>");
	});
	$('.projectMenu a:first-child').addClass('active');
	$('.projectMenu a.menuButton').click (function () {
		var projectPosition = $(this).index() + 1;
		var currentClass = 'position'+$(this).parent().parent().data('position');
		$(this).parent().parent().removeClass (currentClass);
		$(this).parent().parent().data('position', projectPosition);
		var newClass = 'position'+$(this).parent().parent().data('position');
		$(this).parent().parent().addClass (newClass);
		$(this).parent().find('a.menuButton').removeClass('active');
		$(this).addClass('active');
	});
	$('.projectNav.leftNav').click (function () {
		var currentClass = 'position'+$(this).parent().data('position');
		$(this).parent().removeClass (currentClass);
		var projectPosition = $(this).parent().data('position') - 1;
		if (projectPosition < 1) {
			projectPosition = $(this).parent().find('.blockContent').length;
		}
		$(this).parent().data('position', projectPosition);
		var newClass = 'position'+$(this).parent().data('position');
		$(this).parent().addClass (newClass);
		$(this).parent().find('.projectMenu a.menuButton').removeClass('active');
		$(this).parent().find('.projectMenu a.menuButton:nth-child('+projectPosition+')').addClass ('active');
	})
	$('.projectNav.rightNav').click (function () {
		var currentClass = 'position'+$(this).parent().data('position');
		$(this).parent().removeClass (currentClass);
		var projectPosition = $(this).parent().data('position') + 1;
		if (projectPosition > $(this).parent().find('.blockContent').length) {
			projectPosition = 1;
		}
		$(this).parent().data('position', projectPosition);
		var newClass = 'position'+$(this).parent().data('position');
		$(this).parent().addClass (newClass);
		$(this).parent().find('.projectMenu a.menuButton').removeClass('active');
		$(this).parent().find('.projectMenu a.menuButton:nth-child('+projectPosition+')').addClass ('active');
	});
	$('.gallery').mouseover (function () {
		$(this).addClass('hoverState');
	});
	$('.gallery').mouseleave (function () {
		$(this).removeClass('hoverState');
	});
	$('.indexMenu').each (function () {
		var numScreenshots = $(this).parent().parent().find('.galleryImage').length;
		for (i=1; i<=numScreenshots; i++) {
			$(this).append ("<div class='indexMenuItem'>"+i+"</div>");
		}
		$(this).find('.indexMenuItem:first').addClass('active');
	});
	$('.indexMenuItem').click (function () {
		event.preventDefault();
		$(this).parent().find('.indexMenuItem.active').removeClass('active');
		$(this).addClass('active');
		$(this).parent().parent().parent().find('.galleryImage.active').removeClass('active');
		var newIndex = $(this).index()+1;
		$(this).parent().parent().parent().find('.galleryImage:nth-child('+newIndex+')').addClass('active');
		var linkPath = $(this).parent().parent().parent().find('.galleryImage.active').css('background-image');
		linkPath = linkPath.replace('url(','').replace(')','').replace(/\"/gi, "");
		$(this).parent().parent().find('.openNewWindowButton').attr("href", linkPath);
	});
	$('.openNewWindowButton').each (function () {
		var linkPath = $(this).parent().parent().find('.galleryImage.active').css('background-image');
		linkPath = linkPath.replace('url(','').replace(')','').replace(/\"/gi, "");
		$(this).attr("href", linkPath);
		$('#log').html(linkPath);
	})
}
function initPersonalGallery () {
	$('a.personalProjectThumbnail').each (function () {
		var linkPath = $(this).css ('background-image');
		linkPath  = linkPath.replace('url(','').replace(')','').replace(/\"/gi, "");
		$(this).attr("href", linkPath);
	})
}
function initTimeline () {
	$(".timelineDate:first-child").data('spacer', ((new Date).getFullYear()-2016));
	$(".timelineDate:first-child").find('.timelineYear').append((new Date).getFullYear());
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	var currentMonth = (new Date).getMonth()
	$(".timelineDate:first-child").find('.timelineMonth').append(monthNames[currentMonth]);
	$(".timelineDate").each (function () {
		var spacerCount = $(this).data('spacer');
		if (spacerCount > 0) {
			$(this).after("<div class='timelineSpacer'><div class='leftCap'></div><div class='rightCap'></div><div class='midCap'></div></div>")
			$('.timelineSpacer:last').width ((spacerCount*57)+30);
		}
	})
}
function timelineCheck () {
	var timelinePoint = $('#timelineMarker').offset().left + ($('#timelineMarker').width()*.5);
	if (timelinePoint <= $('#timeline').offset().left || timelinePoint >= $('#timeline').offset().left+$('#timeline').width()) {
		$('.job').removeClass('focused').removeClass('delay');
	} else {
		$('.timelineSpacer').each (function() {
			if ($(this).is('.timelineSpacer:first')) {
				var leftSide = $('.timelineDate').width();
				var rightSide = $('.timelineDate').width() * .5;
			} else if ($(this).is('.timelineSpacer:last')) {
				var leftSide = $('.timelineDate').width() * .5;
				var rightSide = $('.timelineDate').width();
			} else {
				var leftSide = $('.timelineDate').width() * .5;
				var rightSide = $('.timelineDate').width() * .5;
			}
			if ($(this).offset().left-leftSide < timelinePoint && ($(this).offset().left + $(this).width()) + rightSide > timelinePoint ) {
				jobPosition = $(this).index('.timelineSpacer');
				$('.timelineSpacer').removeClass('focused');
				$('.timelineDate').removeClass('focused');
				$(this).addClass ('focused');
				$(this).prev().addClass ('focused');
				$(this).next().addClass ('focused');
				$('.job').removeClass('delay');
				if ($('.job').hasClass('focused')) {
					$('#job'+jobPosition).addClass('delay');
				}
				$('.job').removeClass('focused');
				$('#job'+jobPosition).addClass('focused');
			}
		});
	}
}

function navLinks () {
	$('#nav_welcomeIcon').click (function () {
		scrollToPoint(null);
	});
	$('#nav_professionalIcon').click (function () {
		scrollToPoint('#professionalIntrospace');
	});
	$('#introScrollDown').click (function () {
		scrollToPoint('#professionalIntrospace');
	});
	$('#nav_gotIcon').click (function () {
		scrollToPoint('#gotPlaceholder');
	});
	$('#nav_lotroIcon').click (function () {
		scrollToPoint('#lotroPlaceholder');
	});
	$('#nav_ddoIcon').click (function () {
		scrollToPoint('#ddoPlaceholder');
	});
	$('#nav_icIcon').click (function () {
		scrollToPoint('#icPlaceholder');
	});
	$('#nav_personalIcon').click (function () {
		scrollToPoint('#personalIntrospace');
	});
	$('#nav_gallery1').click (function () {
		scrollToPoint('#grid1Placeholder');
	});
	$('#nav_gallery2').click (function () {
		scrollToPoint('#grid2Placeholder');
	});
	$('#nav_gallery3').click (function () {
		scrollToPoint('#grid3Placeholder');
	});
	$('#nav_gallery4').click (function () {
		scrollToPoint('#grid4Placeholder');
	});
	$('#nav_qualificationIcon').click (function () {
		scrollToPoint('#experienceIntrospace');
	});
	$('#nav_workExperience').click (function () {
		scrollToPoint('#timelineAnchor');
	});
	$('#nav_skills').click (function () {
		scrollToPoint('#skillsPlaceholder');
	});
	$('#nav_software').click (function () {
		scrollToPoint('#softwarePlaceholder');
	});
}

function scrollToPoint(targetDiv) {
	if (targetDiv == null) {
		var targetPoint = 0;
	} else {
		var targetPoint = $(targetDiv).offset().top + (($(targetDiv).height()*.5)-($(window).height()*.5));
	}
	var distance = Math.round(Math.abs(targetPoint - $(document).scrollTop())*.5);
	var scrollSpeed = 1000 + (distance*.5);
	$("body, html").animate({
		scrollTop: targetPoint
	}, scrollSpeed);
}

function navCheck () {
	if ($(document).scrollTop() + $(window).height() > $('#softwarePlaceholder').offset().top) {
		var selectedNav = '#nav_software';
	} else if ($(document).scrollTop() + $(window).height() > $('#skillsPlaceholder').offset().top) {
		var selectedNav = '#nav_skills';
	} else if ($(document).scrollTop() + $(window).height() > $('#timelineAnchor').offset().top) {
		var selectedNav = '#nav_workExperience';
	} else if ($(document).scrollTop() + $(window).height() > $('#experienceIntrospace').offset().top) {
		var selectedNav = '#nav_qualificationIcon';
	} else if ($(document).scrollTop() + $(window).height() > $('#grid4Placeholder').offset().top) {
		var selectedNav = '#nav_gallery4';
	} else if ($(document).scrollTop() + $(window).height() > $('#grid3Placeholder').offset().top) {
		var selectedNav = '#nav_gallery3';
	} else if ($(document).scrollTop() + $(window).height() > $('#grid2Placeholder').offset().top) {
		var selectedNav = '#nav_gallery2';
	} else if ($(document).scrollTop() + $(window).height() > $('#grid1Placeholder').offset().top) {
		var selectedNav = '#nav_gallery1';
	} else if ($(document).scrollTop() + $(window).height() > $('#personalIntrospace').offset().top) {
		var selectedNav = '#nav_personalIcon';
	} else if ($(document).scrollTop() + $(window).height() > $('#icPlaceholder').offset().top) {
		var selectedNav = '#nav_icIcon';
	} else if ($(document).scrollTop() + $(window).height() > $('#ddoPlaceholder').offset().top) {
		var selectedNav = '#nav_ddoIcon';
	} else if ($(document).scrollTop() + $(window).height() > $('#lotroPlaceholder').offset().top) {
		var selectedNav = '#nav_lotroIcon';
	} else if ($(document).scrollTop() + $(window).height() > $('#gotPlaceholder').offset().top) {
		var selectedNav = '#nav_gotIcon';
	} else if ($(document).scrollTop() + $(window).height() > $('#professionalIntrospace').offset().top) {
		var selectedNav = '#nav_professionalIcon';
	} else {
		var selectedNav = '#nav_welcomeIcon';
	}
	if ($(selectedNav).hasClass ('selected') == false) {
		$('#logo').removeClass()
		if (selectedNav == '#nav_welcomeIcon') {
			$('#logo').addClass ('intro');
		} else if (selectedNav == '#nav_professionalIcon' || selectedNav == '#nav_gotIcon' || selectedNav == '#nav_lotroIcon' || selectedNav == '#nav_ddoIcon' || selectedNav == '#nav_icIcon') {
			$('#logo').addClass ('professional');
		} else if (selectedNav == '#nav_personalIcon'  || selectedNav == '#nav_gallery1') {
			$('#logo').addClass ('personal');
		} else {
			$('#logo').addClass ('experience');
		}
		$('.navItem').removeClass('selected');
		$(selectedNav).addClass('selected');
	}
}