

var TPL = {
	body:
		'<div id="main" style="display:block;">'
			+'<div id="header">{TABS}<div id="search"><input type="search" id="search_keyword" value="" onkeypress="if (13 == event.keyCode) {mposP_ORDER_LIST_SEARCH();}"><br><span class="search" onclick="mposP_ORDER_LIST_SEARCH();">�j�M</span></div></div>'
			+'{WARNING}'
			+'<div id="page"></div>'
			+'<div id="footer">{TABS}</div>'
		+'</div>'
		+'<div id="dialog" style="display:none;"></div>'
		+'<div id="description" style="display:none;"></div>'
	
	,error:
		'<div id="error">{MSG}<br><br><br><button onclick="history.back();">��^�W�@�B</button></div>'
	
	,warning:
		'<div id="warning">{MSG}</div>'
		
	,done_send:
		'<h1>{TABLE} �e�槹���I</h1>'
		+'<div class="notice">{PURCHASER}, �z���\�I�w�e�槹���I<br>�е��ԪA�ȤH���B�z, �P�±z���q��<br><br>�`���B: {TOTAL} ��<br>�I�@��: {PAY} ��<br>��@�s: {CHANGE} ��<br>�ơ@��: {MEMO}</div>'
		+'<div id="meals">{ITEMS}</div>'
		+'<div class="gohome"><span class="gohome" onclick="location.href=\'./\';">�~���I�\</span></div>'
		+'<div class="contact">{CONTACT}</div>'

	,done_send_mode_table:
		'<h1>{TABLE} �e�槹���I</h1>'
		+'<div class="notice">{PURCHASER}, �z���\�I�w�e�槹���I<br>�е��ԪA�ȤH���B�z, �P�±z���q��<br><br>�ơ@��: {MEMO}</div>'
		+'<div id="meals">{ITEMS}</div>'
		+'<div class="gohome"><span class="gohome" onclick="location.href=\'./\';">�~���I�\</span></div>'
		+'<div class="contact">{CONTACT}</div>'
		
				
	,done_send_item:
		'<div class="r{BIT}" style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_icon_{PHOTO_ID}.jpg);">'
			+'<ul class="list">'
				+'<li class="remove">&nbsp;</li>'
				+'<li class="texts"><h4>{TITLE}</h4><div class="options">{OPTIONS}&nbsp;</div><div class="total">�@ {COUNT} {UNIT}</div></li>'
			+'</ul><br class="clear">'
		+'</div>'
	
	,done_call:
		'<h1>�I�s�����I</h1>'
		+'<div class="notice">{CALLER}:<br><br>{MSG}<br><br></div>'
		+'<div class="gohome"><span class="gohome" onclick="location.href=\'./\';">�~���I�\</span></div>'
		+'<div class="contact">{CONTACT}</div>'
	
	,done_guestbook:
		'<h1>�d�������I</h1>'
		+'<div class="notice">{POSTER}:<br><br>�P�±z���_�Q�N���I<br><br></div>'
		+'<div class="gohome"><span class="gohome" onclick="location.href=\'./\';">�~���I�\</span></div>'
		+'<div class="contact">{CONTACT}</div>'
				
	,tabs:
		'<ul class="list">'
			+'<li><div onclick="mposCHANGE_TAB(this);" class="current">���i</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">�I�\</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">����</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">�e��</div></li>'
		+'</ul><br class="clear">'
	
	,tabs_mode_table:
		'<ul class="list">'
			+'<li><div onclick="mposCHANGE_TAB(this);" class="current">���i</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">�I�\</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">����</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">�e��</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">�ȪA</div></li>'
		+'</ul><br class="clear">'
		
	,tab_notice:
		'<h1>�ู<br>{TABLE}</h1>'
		+'<div class="notice">{NOTICE}</div>'
		+'{BLOCK_GOODS_AD}'
		+'<div class="contact">{CONTACT}</div>'
	
	,tab_list:
		'<h1>{TITLE}</h1><div id="meals">{ITEMS}</div><div id="mealsclear">'
			+'<ul class="list">'
				+'<li class="clear"><span class="clear" onclick="mposREMOVE_ALL_MEALS();">��������</span></li>'
				+'<li class="total"><div class="total">{TOTAL}</div></li>'
			+'</ul><br class="clear">'
		+'</div>'
		
	,tab_list_item:
		'<div class="r{BIT}" style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_icon_{PHOTO_ID}.jpg);">'
			+'<ul class="list">'
				+'<li class="remove"><div class="remove" onclick="mposREMOVE_MEAL(this.parentNode.parentNode.parentNode);">&nbsp;</div></li>'
				+'<li class="texts"><h4>{TITLE}</h4><div class="options">{OPTIONS}&nbsp;</div><div class="total">{TOTAL}</div></li>'
				+'<li class="button"><div class="dec" onclick="mposDEC_MEAL(this.parentNode.parentNode.parentNode);">&nbsp;</div><div class="inc" onclick="mposINC_MEAL(this.parentNode.parentNode.parentNode);">&nbsp;</div></li>'
			+'</ul><br class="clear">'
		+'</div>'
	
	,tab_list_empty:
		'<h1>�|���I�\</h1><div id="meals"><div class="empty">&nbsp;</div></div><div id="mealsclear"></div>'
	
	,tab_send:
		'<h1>��g�e����</h1><div id="send"><form action="send.php" method="post" onsubmit="return mposCHECK_DATA_FOR_SEND(this);">'
			+'<input type="hidden" id="send_mode" name="mode" value="">'
			+'<input type="hidden" name="rows" value="{ROWS}">'
			+'<textarea id="send_tsv" name="tsv">{TSV}</textarea>'
			+'<ul class="list">'
				+'<li class="text">&nbsp;�ู<br><input type="text" id="send_table" class="table" name="table" value="{TABLE}" onclick="mposSELECT_TABLE(this);" readonly></li>'
				+'<li class="text">&nbsp;�٩I<br><input type="text" id="send_purchaser" name="purchaser" value="{PURCHASER}"></li>'
				+'<li class="text">&nbsp;�Ƶ�<br><input type="text" id="send_memo" name="memo" value=""></li>'
				+'<li class="number">�I��<br><input type="number" id="send_pay" name="pay" value="0" readonly></li>'
				+'<li class="number">�`���B<br><input type="number" id="send_total" name="total" value="{TOTAL}" readonly></li>'
				+'<li class="number">��s<br><input type="number" id="send_change" name="change" value="{CHANGE}" readonly></li>'
				+'<li class="currency">{ITEMS}</li>'
				+'<li class="submit"><input type="submit" id="send_submit" value="�e��"></li>'
			+'</ul><br class="clear">'
		+'</form></div>'
	
	,tab_send_mode_table:
		'<h1>��g�e����</h1><div id="send"><form action="send.php" method="post" onsubmit="return mposCHECK_DATA_FOR_SEND(this);">'
			+'<input type="hidden" id="send_mode" name="mode" value="">'
			+'<input type="hidden" name="rows" value="{ROWS}">'
			+'<input type="hidden" name="pay" value="0">'
			+'<input type="hidden" name="total" value="0">'
			+'<input type="hidden" name="change" value="0">'
			+'<textarea id="send_tsv" name="tsv">{TSV}</textarea>'
			+'<ul class="list">'
				+'<li class="text">&nbsp;�ู<br><input type="text" id="send_table" class="table" name="table" value="{TABLE}" readonly></li>'
				+'<li class="text">&nbsp;�٩I<br><input type="text" id="send_purchaser" name="purchaser" value="{PURCHASER}"></li>'
				+'<li class="text">&nbsp;�Ƶ�<br><input type="text" id="send_memo" name="memo" value=""></li>'
				+'<li class="submit"><br><br><br><br><br><br><br><br><input type="submit" id="send_submit" class="submit" value="�e��"></li>'
			+'</ul><br class="clear">'
		+'</form></div>'
		
	,tab_send_item:
		'<span class="currency" style="background-image:url('+FOLDER_CURRENCY+'cash_{PHOTO_ID}.png);" onclick="mposADD_PAY_VALUE({CURRENCY});">{TITLE}</span>'
	
	,tab_send_empty:
		'<h1>�Х��I�\</h1><div id="meals"><div class="empty">&nbsp;</div></div><div id="mealsclear"></div>'
	
	,tab_service_call:
		'<h1>�I�s�d�O</h1><div class="call"><form action="call.php" method="post" onsubmit="return mposCHECK_DATA_FOR_CALL(this);">'
			+'<ul class="list">'
				+'<li class="text">&nbsp;�ู<br><input type="text" class="table" name="table" value="{TABLE}" readonly></li>'
				+'<li class="text">&nbsp;�٩I<br><input type="text" name="caller" value="{CALLER}"></li>'
				+'<li class="msg"><textarea name="msg" rows="3">�ЪA�ȤH���Ӥ@�U, ���¡I</textarea></li>'
				+'<li class="submit"><input type="submit" class="submit" value="�I�s"></li>'
			+'</ul><br class="clear">'
		+'</form></div>'
		
	,tab_service_guestbook:
		'<h1>�N���d��</h1><div class="guestbook"><form action="guestbook.php" method="post" onsubmit="return mposCHECK_DATA_FOR_GUESTBOOK(this);">'
			+'<input type="hidden" name="table" value="{TABLE}">'
			+'<ul class="list">'
				+'<li class="text">&nbsp;�٩I<br><input type="text" name="poster" value="{POSTER}"></li>'
				+'<li class="email">&nbsp;�H�c<br><input type="email" name="email" value=""></li>'
				+'<li class="msg"><textarea name="msg" rows="10"></textarea></li>'
				+'<li class="submit"><input type="submit" class="submit" value="�d��"></li>'
			+'</ul><br class="clear">'
		+'</form></div>'
		
	,goods_ad:
		'<div class="ad"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,goods_ad_item:
		'<li><div class="col{COLS}x" style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_ad_{COLS}_{PHOTO_ID}.jpg);" onclick="mposCHECK_TAB_IS_ORDER();mposP_GOODS_INFORMATION({ROW});"><span class="title">{TITLE}<br>${PRICE} / {UNIT}</span></div></li>'
		
	,each_menu:
		'<h1>�Ҧ�����</h1><div class="menu"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
	
	,each_menu_item:	
		'<li {CLASS}><div class="title" style="background-image:url('+FOLDER_PHOTO_MENU+'pad_list_{PHOTO_ID}.jpg);" onclick="mposP_MENU({ROW});">{TITLE}</div></li>'
	
	,each_menu_items_spliter:
		'</ul><br class="clear"></div>'
		+'<div class="spliter">&nbsp;</div>'
		+'<div class="menu"><ul class="list">'
		
	,each_category:
		'<h1>�Ҧ�����</h1><div class="category"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
	
	,each_category_item_tag:
		'<li><div {CLASS} style="background-image:url('+FOLDER_PHOTO_TAG+'pad_list_{PHOTO_ID}.png);" onclick="mposP_ORDER_LIST_EACH_GOODS_IN_TAG({ROW});">{TITLE}</div></li>'
				
	,each_category_item_category:
		'<li><div {CLASS} style="background-image:url('+FOLDER_PHOTO_GOODS_CATEGORY+'pad_list_{PHOTO_ID}.png);" onclick="mposP_ORDER_LIST_EACH_GOODS_IN_CATEGORY({ROW});">{TITLE}</div></li>'
	
	,each_category_item_all:
		'<li><div style="background-image:url(logo/logo_64x64.png);" onclick="mposP_ORDER_LIST_EACH_GOODS();">����</div></li>'
		
	,each_goods:
		'<h1>{TITLE}</h1><div class="goods"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,each_goods_items_spliter:
		'</ul><br class="clear"></div>'
		+'<div class="spliter">&nbsp;</div>'
		+'<div class="goods"><ul class="list">'
		
	,each_goods_item:
		'<li {CLASS}>'
			+'<div style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_list_{PHOTO_ID}.jpg);">'
				+'<div class="title" onclick="mposP_GOODS_INFORMATION({ROW});">{TITLE}<br>${PRICE} / {UNIT}</div>'
				+'{ACTION}'
			+'</div>'
		+'</li>'
		
	,menu:
		'<h1>{TITLE} ({CURRENT} / {TOTAL})</h1><div class="menupg">'
			+'<img src="'+FOLDER_PHOTO_MENU+'pad_photo_{PHOTO_ID}.jpg">'
			+'{ITEMS}'
		+'</div><div class="menunav">'
			+'<ul class="list">'
				+'<li class="prev"><div class="prev" onclick="mposP_MENU({PREV_ROW});">&nbsp;</div></li>'
				+'<li class="next"><div class="next" onclick="mposP_MENU({NEXT_ROW});">&nbsp;</div></li>'
			+'</ul><br class="clear">'
		+'</div>'
	
	,menu_item:
		'<div {CLASS} style="left:{LEFT}%; top:{TOP}%; width:{WIDTH}%; height:{HEIGHT}%;" onclick="mposP_GOODS_INFORMATION({ROW});"><span class="title">{TITLE}<br>${PRICE} / {UNIT}</span></div>'
		
	,goods_information:
		'<h1>{TITLE}<br>${PRICE} / {UNIT}</h1><div class="info">'
			+'<div class="photo" style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_photo_{PHOTO_ID}.jpg);">'
				+'<ul class="list">'
					+'<li class="prev"><div class="prev" onclick="mposP_GOODS_INFORMATION({PREV_ROW});">&nbsp;</div></li>'
					+'<li class="next"><div class="next" onclick="mposP_GOODS_INFORMATION({NEXT_ROW});">&nbsp;</div></li>'
				+'</ul><br class="clear">'
			+'</div>'
			+'{ACTION}'
			+'<div class="description">{DESCRIPTION}</div>'	
		+'</div>'
	
	,goods_album:
		'<h3>{TITLE} (��ï)</h3><div class="album">{ITEMS}</div>'
		
	,goods_album_item:
		'<div style="background-image:url('+FOLDER_ALBUM_GOODS+'pad_photo_{ALBUM_ID}.jpg);">&nbsp;</div>'
		
	,goods_action:
		'<div class="action">{ITEMS}</div>'

	,goods_action_item_album:
		'<span class="button" onclick="mposVIEW_GOODS_ALBUM({ROW});">��ï</span>'
	
	,goods_action_item_buy:
		'<span class="button" onclick="mposBUY_GOODS({ROW});">�ʶR</span>'
		
	,goods_action_item_soldout:
		'<span class="soldout">�⧹</span>'
	
	,goods_action_icon_album:
		'<img src="icon/pad_album.png" title="��ï" onclick="mposVIEW_GOODS_ALBUM({ROW});">'
	
	,goods_action_icon_buy:
		'<img src="icon/pad_buy.png" title="�ʶR" onclick="mposBUY_GOODS({ROW});">'
		
	,goods_action_icon_soldout:
		'<img src="icon/pad_soldout.png" title="�⧹">'
	
	,count_option:
		'<h3>�ƶq</h3><div id="gcount"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,count_option_item:
		'<li><div {CLASS} onclick="mposDIALOG_SET_GOODS_COUNT(this);">{VALUE}</div></li>'
		
	,flavor_option:
		'<h3>�f��{LIMIT}</h3><div id="gflavor"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,flavor_option_item:
		'<li><div style="background-image:url('+FOLDER_PHOTO_FLAVOR+'pad_list_{PHOTO_ID}.png);" onclick="mposDIALOG_SET_OPTION_STATUS(this);">{TITLE}</div></li>'
	
	,additional_option:
		'<h3>�[��</h3><div id="gadditional"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,additional_option_item:
		'<li><div style="background-image:url('+FOLDER_PHOTO_INGREDIENT+'pad_list_{PHOTO_ID}.png);" onclick="mposDIALOG_SET_OPTION_STATUS(this);">{TITLE}<br>${PRICE}</div></li>'
	
	,purchase_option:
		'<h3>�[��</h3><div id="gpurchase"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,purchase_option_item:
		'<li>'
			+'<div style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_icon_{PHOTO_ID}.jpg);" onclick="mposDIALOG_SET_GOODS_PURCHASE(this);">'
				+'{TITLE}<br>${PRICE} / {UNIT}<br>'
				+'<span class="more" onclick="mposVIEW_GOODS_DESCRIPTION({ROW});">²��</span>'
			+'</div>'
		+'</li>'
		
	,vice_option:
		'<h3 id="gvice{INDEX}">{TITLE} (���\)</h3><div class="gvice"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,vice_option_item:
		'<li>'
			+'<div {CLASS} style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_icon_{PHOTO_ID}.jpg);" onclick="mposDIALOG_SET_GOODS_VICE(this, {INDEX});">'
				+'{TITLE}<br>${PRICE} / {UNIT}<br>'
				+'<span class="more" onclick="mposVIEW_GOODS_DESCRIPTION({ROW});">²��</span>'
			+'</div>'
		+'</li>'
	
	,select_table:
		'<h1>�п�� �~�a �� ���ήู</h1>'
		+'{TABLE_OPTION}'
		+'<div class="dialog"><span class="apply" onclick="mposP_DIALOG_CLOSE();">����</span></div>'
		
	,table_option:
		'<h3>{TITLE}</h3><div class="ttable"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,table_option_item:
		'<li><div {CLASS} onclick="mposSET_CURRENT_TABLE(\'{TITLE}\');">{TITLE}</div></li>'
			
	,buy_options:
		'<h2 style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_icon_{PHOTO_ID}.jpg);">{TITLE} <br>${PRICE} / {UNIT}</h2>'
			+'{FLAVOR_OPTION}'
			+'{ADDITIONAL_OPTION}'
			+'{PURCHASE_OPTION}'
			+'{VICE_OPTION}'
			+'{COUNT_OPTION}'

	,action_buy_goods:
		'<br><br><div class="dialog">'
			+'<span class="cancel" onclick="if (confirm(\'���ܡH\')) {mposP_DIALOG_CLOSE();}">���</span>'
			+'<span class="apply" onclick="mposADD_GOODS_TO_CART({ROW});">�T�w</span>'
		+'</div>'
	
	,action_buy_purchase:
		'<br><br><div class="dialog">'
			+'<span class="apply" onclick="mposADD_PURCHASE_TO_CART({ROW});">�T�w</span>'
		+'</div>'
		
	,action_buy_vice:
		'<br><br><div class="dialog">'
			+'<span class="apply" onclick="mposADD_VICE_TO_CART({ROW});">�T�w</span>'
		+'</div>'
			
	,action_close_goods_album:
		'<div class="dialog">'
			+'<span class="apply" onclick="mposP_DIALOG_CLOSE();">����</span>'
		+'</div>'
	
	,action_close_goods_description:
		'<div class="dialog">'
			+'<span class="apply" onclick="mposP_DESCRIPTION_CLOSE();">����</span>'
		+'</div>'
		
	,CONFIRM: {
		send:				"{PURCHASER}:\n�z�����O�`���B�� {TOTAL} ��\n�I�� {PAY} ��\n�A�ȤH���N��s {CHANGE} ��{MEMO}\n\n�{�b�n�e��ܡH"
		,send_mode_table:		"{PURCHASER}:\n{MEMO}\n\n�{�b�n�e��ܡH"
		,remove_meal:			"{MEAL}\n\n\n�n�����ܡH"
		,remove_all_meals:		'�n�����Ҧ��\�I�ܡH'
		,call:				"{CALLER}:\n\n{MSG}\n\n�e�X�ܡH"
		,guestbook:			"{POSTER}:\n\n�e�X�d���ܡH"
	}
	
	,ALERT: {
		over_flavor_limit:		'�f���ƶq�W�L�W���I'
		,more_flavor:			'�ЦA�h�� {COUNT} �ؤf���I'
		,more_pay:			'�I�ڪ��B�����I'
		,more_msg:			'�п�J�T���I'
		,msg_too_length:		'�T���L���I'
	}
	
	,PREFIX_NAME: {
		purchase:			'(�[��){NAME}'
		,vice:				'(���\){NAME}'
	}
		
	,TITLE: {
		meal_list_count:		'�@ {COUNT} ��'
		,goods_ads:			'<h1>�H���ӫ~</h1>'
		,list_is_empty:			'�|���I�\'
		,same_category:			'��L�P���ӫ~ ({NAME})'
		,flavor_limit:			' (�п� {LIMIT} ��)'
		,unknow_unit:			'(=_=)'
		,all_goods:			'����'
		,searched_goods:		'�@��� {COUNT} ��'
		,dear_customer:			'�˷R���U��'
		,takeaway:			'�~�a'
		,delivery:			'�~�e(�ۨ�)'
	}	
	
	,ERROR: {
		service_no_respond:		'�A�ȺݨS���^���I'
		,api_arguments:			'API�Ѽƿ��~�I'
		,access_key:			'�s�����_�L�ĩΤw�L���I'
		,post_argument:			'�ǻ��ѼƸ�Ƥ�����I'
		,table:				'�L���ู�I'
		,unknow:			'���������~�N�X�I({CODE})'
		,table_is_closed:		'�藍�_, ����|���}��ϥΡI'
		,order_timeout:			'�藍�_, �{�b�w�L�I�\�ɭ��I'
		,order_type:			'�������q�ʤ覡�I'
		,order_rows:			'�S���q�\��ơI'
		,order_table:			'�S�����w�ู�I'
		,order_pay:			'�I�ڪ��B�����I'
		,lan_ip:			'�D�ϰ����IP�I'
	}	
}