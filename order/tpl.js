

var TPL = {
	body:
		'<div id="main" style="display:block;">'
			+'<div id="header">{TABS}<div id="search"><input type="search" id="search_keyword" value="" onkeypress="if (13 == event.keyCode) {mposP_ORDER_LIST_SEARCH();}"><br><span class="search" onclick="mposP_ORDER_LIST_SEARCH();">搜尋</span></div></div>'
			+'{WARNING}'
			+'<div id="page"></div>'
			+'<div id="footer">{TABS}</div>'
		+'</div>'
		+'<div id="dialog" style="display:none;"></div>'
		+'<div id="description" style="display:none;"></div>'
	
	,error:
		'<div id="error">{MSG}<br><br><br><button onclick="history.back();">返回上一步</button></div>'
	
	,warning:
		'<div id="warning">{MSG}</div>'
		
	,done_send:
		'<h1>{TABLE} 送單完成！</h1>'
		+'<div class="notice">{PURCHASER}, 您的餐點已送單完成！<br>請等候服務人員處理, 感謝您的訂購<br><br>總金額: {TOTAL} 元<br>付　款: {PAY} 元<br>找　零: {CHANGE} 元<br>備　註: {MEMO}</div>'
		+'<div id="meals">{ITEMS}</div>'
		+'<div class="gohome"><span class="gohome" onclick="location.href=\'./\';">繼續點餐</span></div>'
		+'<div class="contact">{CONTACT}</div>'

	,done_send_mode_table:
		'<h1>{TABLE} 送單完成！</h1>'
		+'<div class="notice">{PURCHASER}, 您的餐點已送單完成！<br>請等候服務人員處理, 感謝您的訂購<br><br>備　註: {MEMO}</div>'
		+'<div id="meals">{ITEMS}</div>'
		+'<div class="gohome"><span class="gohome" onclick="location.href=\'./\';">繼續點餐</span></div>'
		+'<div class="contact">{CONTACT}</div>'
		
				
	,done_send_item:
		'<div class="r{BIT}" style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_icon_{PHOTO_ID}.jpg);">'
			+'<ul class="list">'
				+'<li class="remove">&nbsp;</li>'
				+'<li class="texts"><h4>{TITLE}</h4><div class="options">{OPTIONS}&nbsp;</div><div class="total">共 {COUNT} {UNIT}</div></li>'
			+'</ul><br class="clear">'
		+'</div>'
	
	,done_call:
		'<h1>呼叫完成！</h1>'
		+'<div class="notice">{CALLER}:<br><br>{MSG}<br><br></div>'
		+'<div class="gohome"><span class="gohome" onclick="location.href=\'./\';">繼續點餐</span></div>'
		+'<div class="contact">{CONTACT}</div>'
	
	,done_guestbook:
		'<h1>留言完成！</h1>'
		+'<div class="notice">{POSTER}:<br><br>感謝您的寶貴意見！<br><br></div>'
		+'<div class="gohome"><span class="gohome" onclick="location.href=\'./\';">繼續點餐</span></div>'
		+'<div class="contact">{CONTACT}</div>'
				
	,tabs:
		'<ul class="list">'
			+'<li><div onclick="mposCHANGE_TAB(this);" class="current">公告</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">點餐</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">明細</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">送單</div></li>'
		+'</ul><br class="clear">'
	
	,tabs_mode_table:
		'<ul class="list">'
			+'<li><div onclick="mposCHANGE_TAB(this);" class="current">公告</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">點餐</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">明細</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">送單</div></li>'
			+'<li><div onclick="mposCHANGE_TAB(this);">客服</div></li>'
		+'</ul><br class="clear">'
		
	,tab_notice:
		'<h1>桌號<br>{TABLE}</h1>'
		+'<div class="notice">{NOTICE}</div>'
		+'{BLOCK_GOODS_AD}'
		+'<div class="contact">{CONTACT}</div>'
	
	,tab_list:
		'<h1>{TITLE}</h1><div id="meals">{ITEMS}</div><div id="mealsclear">'
			+'<ul class="list">'
				+'<li class="clear"><span class="clear" onclick="mposREMOVE_ALL_MEALS();">全部取消</span></li>'
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
		'<h1>尚未點餐</h1><div id="meals"><div class="empty">&nbsp;</div></div><div id="mealsclear"></div>'
	
	,tab_send:
		'<h1>填寫送單資料</h1><div id="send"><form action="send.php" method="post" onsubmit="return mposCHECK_DATA_FOR_SEND(this);">'
			+'<input type="hidden" id="send_mode" name="mode" value="">'
			+'<input type="hidden" name="rows" value="{ROWS}">'
			+'<textarea id="send_tsv" name="tsv">{TSV}</textarea>'
			+'<ul class="list">'
				+'<li class="text">&nbsp;桌號<br><input type="text" id="send_table" class="table" name="table" value="{TABLE}" onclick="mposSELECT_TABLE(this);" readonly></li>'
				+'<li class="text">&nbsp;稱呼<br><input type="text" id="send_purchaser" name="purchaser" value="{PURCHASER}"></li>'
				+'<li class="text">&nbsp;備註<br><input type="text" id="send_memo" name="memo" value=""></li>'
				+'<li class="number">付款<br><input type="number" id="send_pay" name="pay" value="0" readonly></li>'
				+'<li class="number">總金額<br><input type="number" id="send_total" name="total" value="{TOTAL}" readonly></li>'
				+'<li class="number">找零<br><input type="number" id="send_change" name="change" value="{CHANGE}" readonly></li>'
				+'<li class="currency">{ITEMS}</li>'
				+'<li class="submit"><input type="submit" id="send_submit" value="送單"></li>'
			+'</ul><br class="clear">'
		+'</form></div>'
	
	,tab_send_mode_table:
		'<h1>填寫送單資料</h1><div id="send"><form action="send.php" method="post" onsubmit="return mposCHECK_DATA_FOR_SEND(this);">'
			+'<input type="hidden" id="send_mode" name="mode" value="">'
			+'<input type="hidden" name="rows" value="{ROWS}">'
			+'<input type="hidden" name="pay" value="0">'
			+'<input type="hidden" name="total" value="0">'
			+'<input type="hidden" name="change" value="0">'
			+'<textarea id="send_tsv" name="tsv">{TSV}</textarea>'
			+'<ul class="list">'
				+'<li class="text">&nbsp;桌號<br><input type="text" id="send_table" class="table" name="table" value="{TABLE}" readonly></li>'
				+'<li class="text">&nbsp;稱呼<br><input type="text" id="send_purchaser" name="purchaser" value="{PURCHASER}"></li>'
				+'<li class="text">&nbsp;備註<br><input type="text" id="send_memo" name="memo" value=""></li>'
				+'<li class="submit"><br><br><br><br><br><br><br><br><input type="submit" id="send_submit" class="submit" value="送單"></li>'
			+'</ul><br class="clear">'
		+'</form></div>'
		
	,tab_send_item:
		'<span class="currency" style="background-image:url('+FOLDER_CURRENCY+'cash_{PHOTO_ID}.png);" onclick="mposADD_PAY_VALUE({CURRENCY});">{TITLE}</span>'
	
	,tab_send_empty:
		'<h1>請先點餐</h1><div id="meals"><div class="empty">&nbsp;</div></div><div id="mealsclear"></div>'
	
	,tab_service_call:
		'<h1>呼叫櫃臺</h1><div class="call"><form action="call.php" method="post" onsubmit="return mposCHECK_DATA_FOR_CALL(this);">'
			+'<ul class="list">'
				+'<li class="text">&nbsp;桌號<br><input type="text" class="table" name="table" value="{TABLE}" readonly></li>'
				+'<li class="text">&nbsp;稱呼<br><input type="text" name="caller" value="{CALLER}"></li>'
				+'<li class="msg"><textarea name="msg" rows="3">請服務人員來一下, 謝謝！</textarea></li>'
				+'<li class="submit"><input type="submit" class="submit" value="呼叫"></li>'
			+'</ul><br class="clear">'
		+'</form></div>'
		
	,tab_service_guestbook:
		'<h1>意見留言</h1><div class="guestbook"><form action="guestbook.php" method="post" onsubmit="return mposCHECK_DATA_FOR_GUESTBOOK(this);">'
			+'<input type="hidden" name="table" value="{TABLE}">'
			+'<ul class="list">'
				+'<li class="text">&nbsp;稱呼<br><input type="text" name="poster" value="{POSTER}"></li>'
				+'<li class="email">&nbsp;信箱<br><input type="email" name="email" value=""></li>'
				+'<li class="msg"><textarea name="msg" rows="10"></textarea></li>'
				+'<li class="submit"><input type="submit" class="submit" value="留言"></li>'
			+'</ul><br class="clear">'
		+'</form></div>'
		
	,goods_ad:
		'<div class="ad"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,goods_ad_item:
		'<li><div class="col{COLS}x" style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_ad_{COLS}_{PHOTO_ID}.jpg);" onclick="mposCHECK_TAB_IS_ORDER();mposP_GOODS_INFORMATION({ROW});"><span class="title">{TITLE}<br>${PRICE} / {UNIT}</span></div></li>'
		
	,each_menu:
		'<h1>所有分頁</h1><div class="menu"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
	
	,each_menu_item:	
		'<li {CLASS}><div class="title" style="background-image:url('+FOLDER_PHOTO_MENU+'pad_list_{PHOTO_ID}.jpg);" onclick="mposP_MENU({ROW});">{TITLE}</div></li>'
	
	,each_menu_items_spliter:
		'</ul><br class="clear"></div>'
		+'<div class="spliter">&nbsp;</div>'
		+'<div class="menu"><ul class="list">'
		
	,each_category:
		'<h1>所有分類</h1><div class="category"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
	
	,each_category_item_tag:
		'<li><div {CLASS} style="background-image:url('+FOLDER_PHOTO_TAG+'pad_list_{PHOTO_ID}.png);" onclick="mposP_ORDER_LIST_EACH_GOODS_IN_TAG({ROW});">{TITLE}</div></li>'
				
	,each_category_item_category:
		'<li><div {CLASS} style="background-image:url('+FOLDER_PHOTO_GOODS_CATEGORY+'pad_list_{PHOTO_ID}.png);" onclick="mposP_ORDER_LIST_EACH_GOODS_IN_CATEGORY({ROW});">{TITLE}</div></li>'
	
	,each_category_item_all:
		'<li><div style="background-image:url(logo/logo_64x64.png);" onclick="mposP_ORDER_LIST_EACH_GOODS();">全部</div></li>'
		
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
		'<h3>{TITLE} (相簿)</h3><div class="album">{ITEMS}</div>'
		
	,goods_album_item:
		'<div style="background-image:url('+FOLDER_ALBUM_GOODS+'pad_photo_{ALBUM_ID}.jpg);">&nbsp;</div>'
		
	,goods_action:
		'<div class="action">{ITEMS}</div>'

	,goods_action_item_album:
		'<span class="button" onclick="mposVIEW_GOODS_ALBUM({ROW});">相簿</span>'
	
	,goods_action_item_buy:
		'<span class="button" onclick="mposBUY_GOODS({ROW});">購買</span>'
		
	,goods_action_item_soldout:
		'<span class="soldout">售完</span>'
	
	,goods_action_icon_album:
		'<img src="icon/pad_album.png" title="相簿" onclick="mposVIEW_GOODS_ALBUM({ROW});">'
	
	,goods_action_icon_buy:
		'<img src="icon/pad_buy.png" title="購買" onclick="mposBUY_GOODS({ROW});">'
		
	,goods_action_icon_soldout:
		'<img src="icon/pad_soldout.png" title="售完">'
	
	,count_option:
		'<h3>數量</h3><div id="gcount"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,count_option_item:
		'<li><div {CLASS} onclick="mposDIALOG_SET_GOODS_COUNT(this);">{VALUE}</div></li>'
		
	,flavor_option:
		'<h3>口味{LIMIT}</h3><div id="gflavor"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,flavor_option_item:
		'<li><div style="background-image:url('+FOLDER_PHOTO_FLAVOR+'pad_list_{PHOTO_ID}.png);" onclick="mposDIALOG_SET_OPTION_STATUS(this);">{TITLE}</div></li>'
	
	,additional_option:
		'<h3>加料</h3><div id="gadditional"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,additional_option_item:
		'<li><div style="background-image:url('+FOLDER_PHOTO_INGREDIENT+'pad_list_{PHOTO_ID}.png);" onclick="mposDIALOG_SET_OPTION_STATUS(this);">{TITLE}<br>${PRICE}</div></li>'
	
	,purchase_option:
		'<h3>加購</h3><div id="gpurchase"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,purchase_option_item:
		'<li>'
			+'<div style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_icon_{PHOTO_ID}.jpg);" onclick="mposDIALOG_SET_GOODS_PURCHASE(this);">'
				+'{TITLE}<br>${PRICE} / {UNIT}<br>'
				+'<span class="more" onclick="mposVIEW_GOODS_DESCRIPTION({ROW});">簡介</span>'
			+'</div>'
		+'</li>'
		
	,vice_option:
		'<h3 id="gvice{INDEX}">{TITLE} (附餐)</h3><div class="gvice"><ul class="list">{ITEMS}</ul><br class="clear"></div>'
		
	,vice_option_item:
		'<li>'
			+'<div {CLASS} style="background-image:url('+FOLDER_PHOTO_GOODS+'pad_icon_{PHOTO_ID}.jpg);" onclick="mposDIALOG_SET_GOODS_VICE(this, {INDEX});">'
				+'{TITLE}<br>${PRICE} / {UNIT}<br>'
				+'<span class="more" onclick="mposVIEW_GOODS_DESCRIPTION({ROW});">簡介</span>'
			+'</div>'
		+'</li>'
	
	,select_table:
		'<h1>請選擇 外帶 或 內用桌號</h1>'
		+'{TABLE_OPTION}'
		+'<div class="dialog"><span class="apply" onclick="mposP_DIALOG_CLOSE();">關閉</span></div>'
		
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
			+'<span class="cancel" onclick="if (confirm(\'放棄嗎？\')) {mposP_DIALOG_CLOSE();}">放棄</span>'
			+'<span class="apply" onclick="mposADD_GOODS_TO_CART({ROW});">確定</span>'
		+'</div>'
	
	,action_buy_purchase:
		'<br><br><div class="dialog">'
			+'<span class="apply" onclick="mposADD_PURCHASE_TO_CART({ROW});">確定</span>'
		+'</div>'
		
	,action_buy_vice:
		'<br><br><div class="dialog">'
			+'<span class="apply" onclick="mposADD_VICE_TO_CART({ROW});">確定</span>'
		+'</div>'
			
	,action_close_goods_album:
		'<div class="dialog">'
			+'<span class="apply" onclick="mposP_DIALOG_CLOSE();">關閉</span>'
		+'</div>'
	
	,action_close_goods_description:
		'<div class="dialog">'
			+'<span class="apply" onclick="mposP_DESCRIPTION_CLOSE();">關閉</span>'
		+'</div>'
		
	,CONFIRM: {
		send:				"{PURCHASER}:\n您的消費總金額為 {TOTAL} 元\n付款 {PAY} 元\n服務人員將找零 {CHANGE} 元{MEMO}\n\n現在要送單嗎？"
		,send_mode_table:		"{PURCHASER}:\n{MEMO}\n\n現在要送單嗎？"
		,remove_meal:			"{MEAL}\n\n\n要取消嗎？"
		,remove_all_meals:		'要取消所有餐點嗎？'
		,call:				"{CALLER}:\n\n{MSG}\n\n送出嗎？"
		,guestbook:			"{POSTER}:\n\n送出留言嗎？"
	}
	
	,ALERT: {
		over_flavor_limit:		'口味數量超過上限！'
		,more_flavor:			'請再多選 {COUNT} 種口味！'
		,more_pay:			'付款金額不足！'
		,more_msg:			'請輸入訊息！'
		,msg_too_length:		'訊息過長！'
	}
	
	,PREFIX_NAME: {
		purchase:			'(加購){NAME}'
		,vice:				'(附餐){NAME}'
	}
		
	,TITLE: {
		meal_list_count:		'共 {COUNT} 項'
		,goods_ads:			'<h1>隨機商品</h1>'
		,list_is_empty:			'尚未點餐'
		,same_category:			'其他同類商品 ({NAME})'
		,flavor_limit:			' (請選 {LIMIT} 項)'
		,unknow_unit:			'(=_=)'
		,all_goods:			'全部'
		,searched_goods:		'共找到 {COUNT} 項'
		,dear_customer:			'親愛的顧客'
		,takeaway:			'外帶'
		,delivery:			'外送(自取)'
	}	
	
	,ERROR: {
		service_no_respond:		'服務端沒有回應！'
		,api_arguments:			'API參數錯誤！'
		,access_key:			'存取金鑰無效或已過期！'
		,post_argument:			'傳遞參數資料不完整！'
		,table:				'無此桌號！'
		,unknow:			'未知的錯誤代碼！({CODE})'
		,table_is_closed:		'對不起, 本桌尚未開放使用！'
		,order_timeout:			'對不起, 現在已過點餐時限！'
		,order_type:			'未知的訂購方式！'
		,order_rows:			'沒有訂餐資料！'
		,order_table:			'沒有指定桌號！'
		,order_pay:			'付款金額不足！'
		,lan_ip:			'非區域網路IP！'
	}	
}