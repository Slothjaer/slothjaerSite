$(document).ready(function() {
	sizePanelToSquare ();
	projectNav ();
	panelCheck ();
});
$( document).scroll(function() {
  	panelCheck ();
});
$(window).resize(function() {
	sizePanelToSquare ();
	panelCheck ();
});

function sizePanelToSquare () {
	if ($(window).width() < 450) {
		var targetWidth = $(window).width() * .85;
	} else if ($(window).width() < 600) {
		var targetWidth = $(window).width() * .75;
	} else {
		var targetWidth = $(window).width() * .55;
	}
	var targetHeight = $(window).height()*.72;
	if (targetWidth > targetHeight) {
		var targetSize = targetHeight;
	} else {
		var targetSize = targetWidth;
	}
	if (targetSize > 600) {
		targetSize = 600;
	}
	
	//Welcome Page
	if (($(window).height()) < $(window).width()*.8) {
		var welcomeSpace = $(window).width()*.8;
	} else {
		var welcomeSpace = $(window).height();
	}
	$('#welcomeContent').height(welcomeSpace);
	$('#welcomePage').css({'min-height':(($(window).height()*.5)+welcomeSpace)});
	//$('#welcomeIntroduction').height(targetSize);
	
	//Project Page
	//$('#professionalIntroduction').height(targetSize);
	$('.blockWrapper').width(targetSize);
	$('.project').height(targetSize);
	if ($(window).width() < 450) {
		var targetFontSize = (targetSize-10) * .0019;
	} else if ($(window).width() < 600) {
		var targetFontSize = (targetSize-30) * .0019;
	} else {
		var targetFontSize = (targetSize-70) * .0019;
	}
	$('body').css ({
		fontSize:targetFontSize+'em'
	});
	$('#profesionalPage_background').height($(window).height()*2);
	$('.introduction').css({'min-height':(targetSize*1.8)+'px'});
}

function panelCheck () {
	var topWindowScroll = $(window).scrollTop() + ($(window).height()*.1);
	var bottomWindowScroll = $(window).scrollTop() + ($(window).height()*.9);
	var midWindowScroll = $(window).scrollTop() + ($(window).height()*.5);
	var fullWindowScroll = $(window).scrollTop() + $(window).height();
	
	// welcome page
	var welcomeScrollTopPoint = $('#welcomePage').offset().top+$('#welcomeContent').height();
	var welcomeScrollBottomPoint = $('#welcomePage').offset().top+$('#welcomePage').height();
	if (fullWindowScroll < welcomeScrollTopPoint) {
		$('#welcomeContent').removeClass('transitionState').removeClass('completedState');
	} else if (fullWindowScroll > welcomeScrollBottomPoint) {
		$('#welcomeContent').addClass('completedState').removeClass('transitionState');
	} else {
		$('#welcomeContent').addClass('transitionState').removeClass('completedState');
	}
	if ($(window).scrollTop()<$('#welcomePage').height()){
		var ScalePercent = $(window).scrollTop()/$('#welcomePage').height();
		$('#WelcomePage_rightTreetop').css ({'background-size':(100+(ScalePercent*60))+'% auto'});
		$('#WelcomePage_leftTreetop').css ({'background-size':(100+(ScalePercent*60))+'% auto'});
		$('#WelcomePage_midground').css ({'background-size':'auto '+(50+(ScalePercent*35))+'%'});
		$('#WelcomePage_flyingPteradon').css ({'background-size':'auto '+(95+(ScalePercent*35))+'%'});
		$('#WelcomePage_background').css ({'background-size':'auto '+(38+(ScalePercent*25))+'%'});
		$('#WelcomePage_clouds').css ({'background-size':'auto '+(65+(ScalePercent*20))+'%'});
		$('#welcomeIntroduction').css ({'top':((ScalePercent*100))+'%'});
	}
	// professional introduction
	if ($('#professionalIntroduction').outerHeight() > $(window).height()) {
		var achorPoint = $('#professionalIntroductionAnchor').offset().top + $('#professionalIntroduction').outterHeight();
		var windowPoint = bottomWindowScroll;
	} else {
		var achorPoint = $('#professionalIntroductionAnchor').offset().top;
		var windowPoint = $(window).scrollTop();
	}
	if (achorPoint  > windowPoint) {
		$('#professionalIntroduction').css ({
			'position':'absolute'
		});
	} else {
		$('#professionalIntroduction').css ({
			'position':'fixed'
		});
	}
		
	// professional projects
		
	$('.project').each (function() {
		var targetArea = '#'+$(this).attr('id') + "_targetArea";
		var targetAreaTop = $(targetArea).offset().top;
		var targetAreaBottom = targetAreaTop + $(targetArea).height();
		var targetPct = (midWindowScroll-targetAreaTop)/$(targetArea).height();
		if ($(window).width() < 600) {
			var topBuffer = .45;
		} else {
			var topBuffer = .35;
		}
		var bottomBuffer = 1 - topBuffer;
		if (targetPct > topBuffer && targetPct < bottomBuffer) {
			$(this).css ({ top:'50%' });
		} else if (targetPct > 1) {
			$(this).css ({ top:'150%' });
		} else if (targetPct < 0) {
			$(this).css ({ top:'-75%' });
		} else if (targetPct > 0 && targetPct < topBuffer) {
			var abovePct = 150-(targetPct/(.01*topBuffer));
			$(this).css ({ top:abovePct+'%' });
		} else if (targetPct > bottomBuffer && targetPct < 1) {
			var belowPct = 50 - ((targetPct-bottomBuffer)/(.01*topBuffer));
			$(this).css ({ top:belowPct+'%' });
		}
		if (targetPct > .1 && targetPct < .9) {
			$(this).addClass('focused');
		} else {
			$(this).removeClass ('focused')
		}
		
	});
	//professional background
	
	var topTargetPoint = $('#professionalForgroundImages').offset().top;
	var bottomTargetPoint = $('#professionalForgroundImages').offset().top + ($('#professionalForgroundImages').outerHeight());
	var dropAmount = ($('#professionalForgroundImages').outerHeight()) - $('#profesionalPage_background').height();
	if (topTargetPoint > topWindowScroll ) {
		$('#profesionalPage_background').css({
			'top':0+'%'
		});
	} else if (bottomTargetPoint < bottomWindowScroll) {
		$('#profesionalPage_background').css({
			'top':dropAmount+'px'
		});
	} else {
		var backgroundPercent = (topWindowScroll-topTargetPoint)/((bottomTargetPoint+(topWindowScroll-bottomWindowScroll))-topTargetPoint);
		var backgroundTopPlacement = dropAmount * backgroundPercent;
		$('#profesionalPage_background').css({
			'top':backgroundTopPlacement+'px'
		});
	}
}

function projectNav () {
	$('.rightButton').click (function () {
		event.preventDefault();
		$(this).parent().parent().removeClass('active');
		$(this).parent().parent().next().addClass('active');
	});
	$('.leftButton').click (function () {
		event.preventDefault();
		$(this).parent().parent().removeClass('active');
		$(this).parent().parent().prev().addClass('active');
	});
	$('.introButton').click (function () {
		event.preventDefault();
		$(this).parent().parent().removeClass('active');
		$(this).parent().parent().next().addClass('active');
	});
	$('.textToggle').click (function () {
		event.preventDefault();
		$(this).parent().parent().toggleClass('textView');
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