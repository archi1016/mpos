
var PROJECT_NAME			= '自助點餐網頁版';
var PROJECT_VERSION			= '2012-04-24';
var PROJECT_COMPANY			= '華宇科技';
var PROJECT_PROGRAMMER			= 'FongChi';

var STORAGE_KEY_COUNT			= 'MPOS_MEAL_COUNT';
var STORAGE_KEY_LIST			= 'MPOS_MEAL_LIST';
var STORAGE_KEY_PURCHASER		= 'SEND_PURCHASER';
var STORAGE_KEY_TOTAL			= 'SEND_TOTAL';
var STORAGE_KEY_PAY			= 'SEND_PAY';
var STORAGE_KEY_CHANGE			= 'SEND_CHANGE';
var STORAGE_KEY_MEMO			= 'SEND_MEMO';
var STORAGE_KEY_MSG			= 'SEND_MSG';

var TAB_NOTICE	= 0;
var TAB_ORDER	= 1;
var TAB_LIST	= 2;
var TAB_SEND	= 3;
var TAB_SERVICE	= 4;
var GOODS_EACH_PAGE = 9;
var MENU_EACH_PAGE = 6;

var LastTabIndex = 0;
var MainScrollTop = 0;
var DialogScrollTop = 0;

var GoodsIdIsSoldOut = new Array();
var GoodsListCount = 1;


var GoodsIdToMenuIndex = new Array();
var GoodsIdToMenuGoodsRowIndex = new Array();
var MenuGoodsRowIndexs = new Array();
var MenuGoodsRowIndexsCount = 0;

var GoodsIdToCategoryIndex = new Array();
var GoodsIdToCategoryGoodsRowIndex = new Array();
var CategoryGoodsRowIndexs = new Array();
var CategoryGoodsRowIndexsCount = 0;

var CurrentCategoryIndex = -1;
var CurrentTagIndex = -1;
var CurrentGoodsIndex = -1;
var CurrentMenuIndex = -1;

var LastGoodsCountIndex = 0;
var LastGoodsPurchaseIndex = -1;
var LastGoodsViceIndexs = new Array(9);

var MealList = new Array();
var MealListCount = 0;

var MainGoodsCount = 0;
var MainGoodsRowIndex = 0;

var SubGoodsRowIndexs = new Array();
var SubGoodsRowIndexsCount = 0;
var CurrentSubGoodsRowIndex = 0;

var PurchaseRowIndexs = new Array();
var PurchaseRowIndexsCount = 0;

var ViceRowIndexs = new Array();
var ViceRowIndexsCount = new Array();

function OrderError(e) {
	var t = '';
	switch (e) {
		case ERROR_SERVICE_NO_RESPOND:
			t = TPL.ERROR.service_no_respond;
			break;
		case ERROR_API_ARGUMENTS:
			t = TPL.ERROR.api_arguments;
			break;
		case ERROR_ACCESS_KEY:
			t = TPL.ERROR.access_key;
			break;
		case ERROR_POST_ARGUMENT:
			t = TPL.ERROR.post_argument;
			break;
		case ERROR_TABLE:
			t = TPL.ERROR.table;
			break;
		case ERROR_TABLE_IS_CLOSED:
			t = TPL.ERROR.table_is_closed;
			break;
		case ERROR_ORDER_TIMEOUT:
			t = TPL.ERROR.order_timeout;
			break;
		case ERROR_ORDER_TYPE:
			t = TPL.ERROR.order_type;
			break;
		case ERROR_ORDER_ROWS:
			t = TPL.ERROR.order_rows;
			break;
		case ERROR_ORDER_TABLE:
			t = TPL.ERROR.order_table;
			break;
		case ERROR_ORDER_PAY:
			t = TPL.ERROR.order_pay;
			break;
		case ERROR_LAN_IP:
			t = TPL.ERROR.lan_ip;
			break;
		default:
			t = TPL.ERROR.unknow.replace('{CODE}', e);
			break;
	}
	mposW(TPL.error.replace('{MSG}', t));
}

function OrderInit() {
	var h = TPL.body.replace(/\{TABS\}/g, TPL.tabs);
	var w = '';
	switch (CurrentOrderMode) {
		case ORDER_MODE_TAKEAWAY:
			CurrentTableName = TPL.TITLE.takeaway;
			break;
		case ORDER_MODE_TABLE:
			h = TPL.body.replace(/\{TABS\}/g, TPL.tabs_mode_table);
			if ('0' == CurrentTableTiming) {
				w = TPL.ERROR.table_is_closed;
			} else {
				if ('1' == CurrentOrderTimeout) {
					w = TPL.ERROR.order_timeout;
				}
			}
			break;
		case ORDER_MODE_DELIVERY:
			CurrentTableName = TPL.TITLE.delivery;
			break;
		default:
			break;
	}
	if ('' == w) {
		h = h.replace('{WARNING}', '');
	} else {
		h = h.replace('{WARNING}', TPL.warning.replace('{MSG}', w));
	}
	mposW(h);
	mposCHECK_GOODS_SOLD_OUT();
	if (mposCONFIG.OrderMenuMode) {
		mposCHECK_GOODS_MENU_INDEX();
	} else {
		mposCHECK_GOODS_CATEGORY_INDEX();
	}
	mposCHECK_PURCHASER();
	mposP_NOTICE();	
	mposLOAD_CART();
}

function OrderDoneGuestbook() {
	var h = TPL.done_guestbook;
	h = h.replace('{TABLE}'		,CurrentTableName);
	h = h.replace('{POSTER}'	,localStorage.getItem(STORAGE_KEY_PURCHASER));
	h = h.replace('{CONTACT}'	,mposRETURN_CONTACT());
	mposW(h);
	mposCLEAR_LOCAL_STORAGE();
}

function OrderDoneCall() {
	var m = localStorage.getItem(STORAGE_KEY_MSG);
	var h = TPL.done_call;
	h = h.replace('{TABLE}'		,CurrentTableName);
	h = h.replace('{CALLER}'	,localStorage.getItem(STORAGE_KEY_PURCHASER));
	h = h.replace('{MSG}'		,m);
	h = h.replace('{CONTACT}'	,mposRETURN_CONTACT());
	mposW(h);
	mposCLEAR_LOCAL_STORAGE();
}

function OrderDoneSend() {
	var id2row = mposGOODS[mposGOODS.length-1].IdToRow;
	var i;
	var r;
	var tp;
	var h = '';

	mposLOAD_CART();
	for (i=0; i<MealListCount; i++) {
		r = mposGOODS[id2row[MealList[i][MEAL_LIST_ITEM_ID]]];
			
		tp = TPL.done_send_item;
		tp = tp.replace('{BIT}'			,i&1);
		tp = tp.replace('{PHOTO_ID}'		,mposRETURN_ID_STR(r.Id));
		tp = tp.replace('{TITLE}'		,MealList[i][MEAL_LIST_NAME]);
		tp = tp.replace('{OPTIONS}'		,mposRETURN_MEAL_OPTIONS(i));
		tp = tp.replace('{COUNT}'		,MealList[i][MEAL_LIST_COUNT]);
		tp = tp.replace('{UNIT}'		,MealList[i][MEAL_LIST_UNIT]);
		h += tp;
	}
	switch (CurrentOrderMode) {
		case ORDER_MODE_TABLE:
			h = TPL.done_send_mode_table.replace('{ITEMS}', h);
			break;
		default:
			h = TPL.done_send.replace('{ITEMS}', h);
			break;
	}
	h = h.replace('{TABLE}'		,CurrentTableName);
	h = h.replace('{PURCHASER}'	,localStorage.getItem(STORAGE_KEY_PURCHASER));
	h = h.replace('{TOTAL}'		,localStorage.getItem(STORAGE_KEY_TOTAL));
	h = h.replace('{PAY}'		,localStorage.getItem(STORAGE_KEY_PAY));
	h = h.replace('{CHANGE}'	,localStorage.getItem(STORAGE_KEY_CHANGE));
	h = h.replace('{MEMO}'		,localStorage.getItem(STORAGE_KEY_MEMO));
	h = h.replace('{CONTACT}'	,mposRETURN_CONTACT());
	mposW(h);
	mposCLEAR_LOCAL_STORAGE();
}

function mposW(h) {
	document.write(h);
}

function mposCHANGE_TAB(n) {
	var h = mposRETURN_OBJECT_FROM_ID('header');
	var f = mposRETURN_OBJECT_FROM_ID('footer');
	var i = mposRETURN_NODE_INDEX(n.parentNode);
	h = h.firstChild;
	f = f.firstChild;
	h.childNodes[LastTabIndex].firstChild.className = '';
	f.childNodes[LastTabIndex].firstChild.className = '';
	LastTabIndex = i;
	h.childNodes[LastTabIndex].firstChild.className = 'current';
	f.childNodes[LastTabIndex].firstChild.className = 'current';
	switch (i) {
		case TAB_NOTICE:
			mposP_NOTICE();
			break;
		case TAB_ORDER:
			mposP_ORDER();
			break;
		case TAB_LIST:
			mposP_LIST();
			break;
		case TAB_SEND:
			mposP_SEND();
			break;
		case TAB_SERVICE:
			mposP_SERVICE();
			break;
	}
}

function mposP_SERVICE() {
	var tp;
	var h = '';
	if (mposCONFIG.OrderCall) {
		tp = TPL.tab_service_call;
		tp = tp.replace('{TABLE}'	,CurrentTableName);
		tp = tp.replace('{CALLER}'	,localStorage.getItem(STORAGE_KEY_PURCHASER));
		h += tp;
	}
	if (mposCONFIG.OrderGuestbook) {
		tp = TPL.tab_service_guestbook;
		tp = tp.replace('{TABLE}'	,CurrentTableName);
		tp = tp.replace('{POSTER}'	,localStorage.getItem(STORAGE_KEY_PURCHASER));
		h += tp;
	}
	mposCHANGE_PAGE(h);
}

function mposP_SEND() {
	var v;
	var tp;
	var h = ''
	if (MealListCount > 0) {
		v = mposRETURN_MEAL_TOTAL_FROM_LIST();
		switch (CurrentOrderMode) {
			case ORDER_MODE_TABLE:
				h = TPL.tab_send_mode_table;
				break;
			default:
				h = TPL.tab_send.replace('{ITEMS}', mposRETURN_CURRENY_ITEMS());
				break;
		}
		h = h.replace('{PURCHASER}'	,localStorage.getItem(STORAGE_KEY_PURCHASER));
		h = h.replace('{TABLE}'		,CurrentTableName);
		h = h.replace('{TOTAL}'		,v);
		h = h.replace('{CHANGE}'	,0-v);
		h = h.replace('{ROWS}'		,MealListCount);
		h = h.replace('{TSV}'		,mposRETURM_MEAL_TSV_FROM_LIST());
	} else {
		h = TPL.tab_send_empty;
	}
	mposCHANGE_PAGE(h);
}

function mposP_LIST() {
	var id2row = mposGOODS[mposGOODS.length-1].IdToRow;
	var i;
	var r;
	var tp;
	var h = '';
	if (MealListCount > 0) {
		for (i=0; i<MealListCount; i++) {
			r = mposGOODS[id2row[MealList[i][MEAL_LIST_ITEM_ID]]];
			
			tp = TPL.tab_list_item;
			tp = tp.replace('{BIT}'			,i&1);
			tp = tp.replace('{PHOTO_ID}'		,mposRETURN_ID_STR(r.Id));
			tp = tp.replace('{TITLE}'		,MealList[i][MEAL_LIST_NAME]);
			tp = tp.replace('{OPTIONS}'		,mposRETURN_MEAL_OPTIONS(i));
			tp = tp.replace('{TOTAL}'		,mposRETURN_MEAL_TOTAL(i));
			h += tp;
		}
		h = TPL.tab_list.replace('{ITEMS}', h);
		h = h.replace('{TOTAL}', '= '+mposRETURN_MEAL_TOTAL_FROM_LIST());
		h = h.replace('{TITLE}', TPL.TITLE.meal_list_count.replace('{COUNT}', MealListCount));
	} else {
		h = TPL.tab_list_empty;
	}
	mposCHANGE_PAGE(h);
}

function mposP_ORDER() {
	CurrentCategoryIndex = -1;
	CurrentTagIndex = -1;
	CurrentGoodsIndex = -1;
	CurrentMenuIndex = -1;
	if (mposCONFIG.OrderMenuMode) {
		mposCHANGE_PAGE(mposRETURN_EACH_MENU()+TPL.TITLE.goods_ads+mposRETURN_GOODS_AD_ROWS());
	} else {
		mposCHANGE_PAGE(mposRETURN_EACH_CATEGORY()+TPL.TITLE.goods_ads+mposRETURN_GOODS_AD_ROWS());
	}
}

function mposP_ORDER_LIST_SEARCH() {
	var k = mposRETURN_OBJECT_FROM_ID('search_keyword');
	if ('' != k.value) {
		mposCHECK_TAB_IS_ORDER();
		CurrentCategoryIndex = -1;
		CurrentTagIndex = -1;
		CurrentGoodsIndex = -1;
		CurrentMenuIndex = -1;
		if (mposCONFIG.OrderMenuMode) {
			mposCHANGE_PAGE(mposRETURN_EACH_SEARCH(k.value)+mposRETURN_EACH_MENU());
		} else {
			mposCHANGE_PAGE(mposRETURN_EACH_SEARCH(k.value)+mposRETURN_EACH_CATEGORY());
		}
	}
}

function mposP_ORDER_LIST_EACH_GOODS() {
	CurrentCategoryIndex = -1;
	CurrentTagIndex = -1;
	CurrentGoodsIndex = -1;
	CurrentMenuIndex = -1;
	mposCHANGE_PAGE(mposRETURN_EACH_GOODS()+mposRETURN_EACH_CATEGORY());
}

function mposP_ORDER_LIST_EACH_GOODS_IN_TAG(rowindex) {
	CurrentCategoryIndex = -1;
	CurrentTagIndex = rowindex;
	CurrentGoodsIndex = -1;
	CurrentMenuIndex = -1;
	mposCHANGE_PAGE(mposRETURN_EACH_GOODS_IN_TAG(rowindex)+mposRETURN_EACH_CATEGORY());
}

function mposP_ORDER_LIST_EACH_GOODS_IN_CATEGORY(rowindex) {
	CurrentCategoryIndex = rowindex;
	CurrentTagIndex = -1;
	CurrentGoodsIndex = -1;
	CurrentMenuIndex = -1;
	mposCHANGE_PAGE(mposRETURN_EACH_GOODS_IN_CATEGORY(rowindex)+mposRETURN_EACH_CATEGORY());
}

function mposP_GOODS_INFORMATION(rowindex) {
	CurrentCategoryIndex = -1;
	CurrentTagIndex = -1;
	CurrentGoodsIndex = rowindex;
	if (mposCONFIG.OrderMenuMode) {
		mposCHANGE_PAGE(mposRETURN_GOODS_INFO(rowindex)+mposRETURN_EACH_MENU());
	} else {
		mposCHANGE_PAGE(mposRETURN_GOODS_INFO(rowindex)+mposRETURN_EACH_CATEGORY());
	}
}

function mposP_MENU(rowindex) {
	CurrentCategoryIndex = -1;
	CurrentTagIndex = -1;
	CurrentGoodsIndex = -1;
	CurrentMenuIndex = rowindex;
	mposCHANGE_PAGE(mposRETURN_MENU(rowindex)+mposRETURN_EACH_MENU());
}

function mposP_NOTICE() {
	var h = TPL.tab_notice;
	h = h.replace('{TABLE}'			,CurrentTableName);
	h = h.replace('{NOTICE}'		,mposORDER_NOTICE.Content);
	h = h.replace('{BLOCK_GOODS_AD}'	,mposRETURN_GOODS_AD_ROWS());
	h = h.replace('{CONTACT}'		,mposRETURN_CONTACT());
	mposCHANGE_PAGE(h);
}







function mposP_DIALOG_SHOW(h) {
	var m = mposRETURN_OBJECT_FROM_ID('main');
	var d = mposRETURN_OBJECT_FROM_ID('dialog');
	MainScrollTop = document.body.scrollTop;
	//if (MainScrollTop < 1) MainScrollTop = 1;
	d.innerHTML = h;
	m.style.display = 'none';
	document.body.scrollTop = 0;
	//document.body.scrollTop = 1;
	d.style.display = 'block';
}

function mposP_DIALOG_CLOSE() {
	var m = mposRETURN_OBJECT_FROM_ID('main');
	var d = mposRETURN_OBJECT_FROM_ID('dialog');
	d.style.display = 'none';
	d.innerHTML = '';
	m.style.display = 'block';
	document.body.scrollTop = MainScrollTop;
}

function mposP_DESCRIPTION_SHOW(h) {
	var m = mposRETURN_OBJECT_FROM_ID('dialog');
	var d = mposRETURN_OBJECT_FROM_ID('description');
	DialogScrollTop = document.body.scrollTop;
	if (DialogScrollTop < 1) DialogScrollTop = 0;
	d.innerHTML = h;
	m.style.display = 'none';
	document.body.scrollTop = 0;
	//document.body.scrollTop = 1;
	d.style.display = 'block';
}

function mposP_DESCRIPTION_CLOSE() {
	var m = mposRETURN_OBJECT_FROM_ID('dialog');
	var d = mposRETURN_OBJECT_FROM_ID('description');
	d.style.display = 'none';
	d.innerHTML = '';
	m.style.display = 'block';
	document.body.scrollTop = DialogScrollTop;
}



function mposREMOVE_ALL_MEALS() {
	var d = mposRETURN_OBJECT_FROM_ID('meals');
	if (confirm(TPL.CONFIRM.remove_all_meals)) {
		d.previousSibling.innerText = TPL.TITLE.list_is_empty;
		d.nextSibling.innerHTML = '';
		d.innerHTML = '<div class="empty">&nbsp;</div>';
		MealListCount = 0;
		MealList = new Array();
		mposSAVE_CART();
	}
}

function mposREMOVE_MEAL(n) {
	var d = mposRETURN_OBJECT_FROM_ID('meals');
	var pi = mposRETURN_NODE_INDEX(n);
	var i;
	var qt = '';
	var chs = new Array();
	var chc = 0;
	while (true) {
		if (-1 == MealList[pi][MEAL_LIST_FOLLOW_ROW]) {
			break;
		}
		pi--;
	}
	for (i=(MealListCount-1); i>pi; i--) {
		if (pi == MealList[i][MEAL_LIST_FOLLOW_ROW]) {
			qt = "\n"+MealList[i][MEAL_LIST_NAME]+qt;
			chs[chc] = i;
			chc++;
		}
	}
	qt = MealList[pi][MEAL_LIST_NAME]+qt;
	qt = TPL.CONFIRM.remove_meal.replace('{MEAL}', qt);
	if (confirm(qt)) {
		if (chc > 0) {
			for (i=0; i<chc; i++) {
				mposREMOVE_MEAL_FROM_LIST(chs[i]);
				d.removeChild(d.childNodes[chs[i]]);
			}
		}
		mposREMOVE_MEAL_FROM_LIST(pi);
		d.removeChild(d.childNodes[pi]);
		if (MealListCount > 0) {
			d.previousSibling.innerText = TPL.TITLE.meal_list_count.replace('{COUNT}', MealListCount);
			d.nextSibling.firstChild.childNodes[1].firstChild.innerText = '= '+mposRETURN_MEAL_TOTAL_FROM_LIST();
			for (i=0; i<MealListCount; i++) {
				d.childNodes[i].className = 'r'+(i&1);
			}
		} else {
			d.previousSibling.innerText = TPL.TITLE.list_is_empty;
			d.nextSibling.innerHTML = '';
			d.innerHTML = '<div class="empty">&nbsp;</div>';
		}
		mposSAVE_CART();
	}
}

function mposDEC_MEAL(n) {
	var d = mposRETURN_OBJECT_FROM_ID('meals');
	var pi = mposRETURN_NODE_INDEX(n);
	var i;
	var chs = new Array();
	var chc = 0;
	while (true) {
		if (-1 == MealList[pi][MEAL_LIST_FOLLOW_ROW]) {
			break;
		}
		pi--;
	}
	for (i=(MealListCount-1); i>pi; i--) {
		if (pi == MealList[i][MEAL_LIST_FOLLOW_ROW]) {
			chs[chc] = i;
			chc++;
		}
	}
	if (chc > 0) {
		for (i=0; i<chc; i++) {
			mposDEC_MEAL_FROM_LIST(chs[i]);
			d.childNodes[chs[i]].firstChild.childNodes[1].childNodes[2].innerText = mposRETURN_MEAL_TOTAL(chs[i]);
		}
	}
	mposDEC_MEAL_FROM_LIST(pi);
	d.childNodes[pi].firstChild.childNodes[1].childNodes[2].innerText = mposRETURN_MEAL_TOTAL(pi);
	d.nextSibling.firstChild.childNodes[1].firstChild.innerText = '= '+mposRETURN_MEAL_TOTAL_FROM_LIST();
	mposSAVE_CART();
}

function mposINC_MEAL(n) {
	var d = mposRETURN_OBJECT_FROM_ID('meals');
	var pi = mposRETURN_NODE_INDEX(n);
	var i;
	var chs = new Array();
	var chc = 0;
	while (true) {
		if (-1 == MealList[pi][MEAL_LIST_FOLLOW_ROW]) {
			break;
		}
		pi--;
	}
	for (i=(MealListCount-1); i>pi; i--) {
		if (pi == MealList[i][MEAL_LIST_FOLLOW_ROW]) {
			chs[chc] = i;
			chc++;
		}
	}
	if (chc > 0) {
		for (i=0; i<chc; i++) {
			mposINC_MEAL_FROM_LIST(chs[i]);
			d.childNodes[chs[i]].firstChild.childNodes[1].childNodes[2].innerText = mposRETURN_MEAL_TOTAL(chs[i]);
		}
	}
	mposINC_MEAL_FROM_LIST(pi);
	d.childNodes[pi].firstChild.childNodes[1].childNodes[2].innerText = mposRETURN_MEAL_TOTAL(pi);
	d.nextSibling.firstChild.childNodes[1].firstChild.innerText = '= '+mposRETURN_MEAL_TOTAL_FROM_LIST();
	mposSAVE_CART();
}



function mposDEC_MEAL_FROM_LIST(index) {
	var p;
	var c;
	if (MealList[index][MEAL_LIST_COUNT] > 1) {
		MealList[index][MEAL_LIST_COUNT]--;
		p = parseInt(MealList[index][MEAL_LIST_ITEM_PRICE]);
		c = parseInt(MealList[index][MEAL_LIST_COUNT]);
		if ('' == MealList[index][MEAL_LIST_ADDITIONAL_PRICE]) {	
			MealList[index][MEAL_LIST_TOTAL] = p * c;
		} else {
			MealList[index][MEAL_LIST_TOTAL] = (p + parseInt(MealList[index][MEAL_LIST_ADDITIONAL_PRICE])) * c;
		}
	}
}

function mposINC_MEAL_FROM_LIST(index) {
	var p;
	var c;
	MealList[index][MEAL_LIST_COUNT]++;
	p = parseInt(MealList[index][MEAL_LIST_ITEM_PRICE]);
	c = parseInt(MealList[index][MEAL_LIST_COUNT]);
	if ('' == MealList[index][MEAL_LIST_ADDITIONAL_PRICE]) {
		MealList[index][MEAL_LIST_TOTAL] = p * c;
	} else {
		MealList[index][MEAL_LIST_TOTAL] = (p + parseInt(MealList[index][MEAL_LIST_ADDITIONAL_PRICE])) * c;
	}
}

function mposREMOVE_MEAL_FROM_LIST(index) {
	var u = MealListCount - 1;
	var i;
	for (i=index; i<u; i++) {
		MealList[i] = MealList[i+1];
		if (-1 != MealList[i][MEAL_LIST_FOLLOW_ROW]) {
			MealList[i][MEAL_LIST_FOLLOW_ROW]--;
		}
	}
	MealListCount--;
	MealList.pop();
}

function mposRETURN_MEAL_TOTAL_FROM_LIST() {
	var i;
	var t = 0;
	if (MealListCount > 0) {
		for (i=0; i<MealListCount; i++) {
			t = t + parseInt(MealList[i][MEAL_LIST_TOTAL]);
		}
		return t;
	} else {
		return 0;
	}
}

function mposRETURM_MEAL_TSV_FROM_LIST() {
	var i;
	var t = '';
	if (MealListCount > 0) {
		t = MealList[0].join(MEAL_FILED_SPLIT_CHAR);
		for (i=1; i<MealListCount; i++) {
			t += "\r\n"+MealList[i].join(MEAL_FILED_SPLIT_CHAR);
		}
		return t;
	} else {
		return '';
	}
}

function mposADD_MEAL_TO_LIST(rowindex, mealtype, followrow) {
	var r = mposGOODS[rowindex];
	var n = r.Name;
	var p = r.Prices.Default;
	var c;
	var i;
	if (followrow >= 0) {
		c = parseInt(MealList[followrow][MEAL_LIST_COUNT]);
	} else {
		MainGoodsCount = mposRETURN_DIALOG_COUNT_SELECTED();
		c = MainGoodsCount;
	}
	switch (mealtype) {
		case ITEM_TYPE_VICE:
			n = TPL.PREFIX_NAME.vice.replace('{NAME}', n);
			p = r.Prices.Vice;
			break;
		case ITEM_TYPE_PURCHASE:
			n = TPL.PREFIX_NAME.purchase.replace('{NAME}', n);
			p = r.Prices.Purchase;
			break;
	}
	MealList[MealListCount] = new Array();
	for (i=0; i<MEAL_LIST_LENGTH; i++) {
		MealList[MealListCount][i] = '';
	}
	MealList[MealListCount][MEAL_LIST_NAME]		= n;
	MealList[MealListCount][MEAL_LIST_UNIT]		= mposRETURN_UNIT_NAME_FROM_ID(r.UnitId);
	MealList[MealListCount][MEAL_LIST_PRICE]	= p;
	MealList[MealListCount][MEAL_LIST_COUNT]	= c;
	MealList[MealListCount][MEAL_LIST_TOTAL]	= p * c;
	MealList[MealListCount][MEAL_LIST_ITEM_PRICE]	= p;
	MealList[MealListCount][MEAL_LIST_ITEM_TYPE]	= mealtype;
	MealList[MealListCount][MEAL_LIST_ITEM_ID]	= r.Id;
	MealList[MealListCount][MEAL_LIST_FOLLOW_ROW]	= followrow;
	MealListCount++;
}


function mposSAVE_CART() {
	var i;
	mposCLEAR_LOCAL_STORAGE();
	localStorage.setItem(STORAGE_KEY_COUNT, MealListCount);
	if (MealListCount > 0) {
		for (i=0; i<MealListCount; i++) {
			localStorage.setItem(STORAGE_KEY_LIST+'_'+i, MealList[i].join(MEAL_FILED_SPLIT_CHAR));
		}
	}
}

function mposLOAD_CART() {
	var i;
	var s;
	MealListCount = localStorage.getItem(STORAGE_KEY_COUNT);
	if (null != MealListCount) {
		if (MealListCount > 0) {
			for (i=0; i<MealListCount; i++) {
				s = localStorage.getItem(STORAGE_KEY_LIST+'_'+i);
				MealList[i] = s.split(MEAL_FILED_SPLIT_CHAR);
			}
		}
	} else {
		MealListCount = 0;
	}
}

function mposCLEAR_LOCAL_STORAGE() {
	localStorage.removeItem(STORAGE_KEY_COUNT);
	localStorage.removeItem(STORAGE_KEY_LIST);
	localStorage.removeItem(STORAGE_KEY_TOTAL);
	localStorage.removeItem(STORAGE_KEY_PAY);
	localStorage.removeItem(STORAGE_KEY_CHANGE);
	localStorage.removeItem(STORAGE_KEY_MEMO);
	localStorage.removeItem(STORAGE_KEY_MSG);
}




function mposADD_GOODS_TO_CART(rowindex) {
	var r = mposGOODS[rowindex];
	mposADD_MEAL_TO_LIST(rowindex, ITEM_TYPE_DEFAULT, -1);
	if (mposRETURN_DIALOG_FLAVOR_SELECTED(r.FlavorId, r.FlavorLimit)) {
		MainGoodsRowIndex = MealListCount - 1;
		mposRETURN_DIALOG_ADDITIONAL_SELECTED(r.AdditionalId);
		if (mposRETURN_DIALOG_PURCHASE_SELECTED(r.PurchaseId)) {
			mposBUY_PURCHASE();
		} else {
			if (mposRETURN_DIALOG_VICE_SELECTED(r.ViceId)) {
				mposBUY_VICE();
			} else {
				mposSAVE_CART();
				mposP_DIALOG_CLOSE();
			}
		}
	}
}

function mposADD_PURCHASE_TO_CART(rowindex) {
	var r = mposGOODS[rowindex];
	mposADD_MEAL_TO_LIST(rowindex, ITEM_TYPE_PURCHASE, MainGoodsRowIndex);
	if (mposRETURN_DIALOG_FLAVOR_SELECTED(r.FlavorId, r.FlavorLimit)) {
		mposRETURN_DIALOG_ADDITIONAL_SELECTED(r.AdditionalId);
		
		CurrentSubGoodsRowIndex++;
		if (CurrentSubGoodsRowIndex < SubGoodsRowIndexsCount) {
			mposBUY_PURCHASE();
		} else {
			mposSAVE_CART();
			mposP_DIALOG_CLOSE();
		}
	}
}

function mposADD_VICE_TO_CART(rowindex) {
	var r = mposGOODS[rowindex];
	mposADD_MEAL_TO_LIST(rowindex, ITEM_TYPE_VICE, MainGoodsRowIndex);
	if (mposRETURN_DIALOG_FLAVOR_SELECTED(r.FlavorId, r.FlavorLimit)) {
		mposRETURN_DIALOG_ADDITIONAL_SELECTED(r.AdditionalId);
		
		CurrentSubGoodsRowIndex++;
		if (CurrentSubGoodsRowIndex < SubGoodsRowIndexsCount) {
			mposBUY_VICE();
		} else {
			mposSAVE_CART();
			mposP_DIALOG_CLOSE();
		}
	}
}




function mposBUY_VICE() {
	var d = mposRETURN_OBJECT_FROM_ID('dialog');
	var r = mposGOODS[SubGoodsRowIndexs[CurrentSubGoodsRowIndex]];
	var h = TPL.buy_options;
	h = h.replace('{PHOTO_ID}'		,mposRETURN_ID_STR(r.Id));
	h = h.replace('{TITLE}'			,TPL.PREFIX_NAME.vice.replace('{NAME}', r.Name));
	h = h.replace('{PRICE}'			,r.Prices.Vice);
	h = h.replace('{UNIT}'			,mposRETURN_UNIT_NAME_FROM_ID(r.UnitId));
	h = h.replace('{FLAVOR_OPTION}'	,mposRETURN_DIALOG_FLAVOR_OPTIONS(r));
	h = h.replace('{ADDITIONAL_OPTION}'	,mposRETURN_DIALOG_ADDITIONAL_OPTIONS(r));
	h = h.replace('{PURCHASE_OPTION}'	,'');
	h = h.replace('{VICE_OPTION}'		,'');
	h = h.replace('{COUNT_OPTION}'	,'');
	h += TPL.action_buy_vice.replace('{ROW}', SubGoodsRowIndexs[CurrentSubGoodsRowIndex]);
	d.innerHTML = h;
}

function mposBUY_PURCHASE() {
	var d = mposRETURN_OBJECT_FROM_ID('dialog');
	var r = mposGOODS[SubGoodsRowIndexs[CurrentSubGoodsRowIndex]];
	var h = TPL.buy_options;
	h = h.replace('{PHOTO_ID}'		,mposRETURN_ID_STR(r.Id));
	h = h.replace('{TITLE}'			,TPL.PREFIX_NAME.purchase.replace('{NAME}', r.Name));
	h = h.replace('{PRICE}'			,r.Prices.Purchase);
	h = h.replace('{UNIT}'			,mposRETURN_UNIT_NAME_FROM_ID(r.UnitId));
	h = h.replace('{FLAVOR_OPTION}'		,mposRETURN_DIALOG_FLAVOR_OPTIONS(r));
	h = h.replace('{ADDITIONAL_OPTION}'	,mposRETURN_DIALOG_ADDITIONAL_OPTIONS(r));
	h = h.replace('{PURCHASE_OPTION}'	,'');
	h = h.replace('{VICE_OPTION}'		,'');
	h = h.replace('{COUNT_OPTION}'		,'');
	h += TPL.action_buy_purchase.replace('{ROW}', SubGoodsRowIndexs[CurrentSubGoodsRowIndex]);
	d.innerHTML = h;
}

function mposBUY_GOODS(rowindex) {
	var r = mposGOODS[rowindex];
	var h = TPL.buy_options;
	h = h.replace('{PHOTO_ID}'		,mposRETURN_ID_STR(r.Id));
	h = h.replace('{TITLE}'			,r.Name);
	h = h.replace('{PRICE}'			,r.Prices.Default);
	h = h.replace('{UNIT}'			,mposRETURN_UNIT_NAME_FROM_ID(r.UnitId));
	h = h.replace('{FLAVOR_OPTION}'		,mposRETURN_DIALOG_FLAVOR_OPTIONS(r));
	h = h.replace('{ADDITIONAL_OPTION}'	,mposRETURN_DIALOG_ADDITIONAL_OPTIONS(r));
	h = h.replace('{PURCHASE_OPTION}'	,mposRETURN_DIALOG_PURCHASE_OPTIONS(r));
	h = h.replace('{VICE_OPTION}'		,mposRETURN_DIALOG_VICE_OPTIONS(r));
	h = h.replace('{COUNT_OPTION}'		,mposRETURN_DIALOG_COUNT_OPTIONS(r));
	h += TPL.action_buy_goods.replace('{ROW}', rowindex);
	mposP_DIALOG_SHOW(h);
}




function mposSET_CURRENT_TABLE(t) {
	var i = mposRETURN_OBJECT_FROM_ID('send_table');
	var m = mposRETURN_OBJECT_FROM_ID('send_mode');
	CurrentTableName = t;
	i.value = CurrentTableName;
	if (TPL.TITLE.takeaway == CurrentTableName) {
		m.value = '';
	} else {
		m.value = ORDER_MODE_HERE;
	}
	mposP_DIALOG_CLOSE();
}

function mposSELECT_TABLE(f) {
	var u = mposPLACE.length - 1;
	var t;
	var i;
	var j;
	var k;
	var tp;
	var h = new Array();
	if (ORDER_MODE_TAKEAWAY != CurrentOrderMode) {
		return;
	}
	tp = TPL.table_option_item;
	if (TPL.TITLE.takeaway == f.value) {
		tp = tp.replace('{CLASS}', 'class="current"');
	} else {
		tp = tp.replace('{CLASS}', '');
	}
	tp = tp.replace(/\{TITLE\}/g, TPL.TITLE.takeaway);
	
	h[0] = TPL.table_option.replace('{ITEMS}', tp);
	h[0] = h[0].replace('{TITLE}', TPL.TITLE.takeaway);
	
	for (i=0; i<u; i++) {
		t = mposPLACE[i];
		j = i + 1;
		h[j] = '';
		
		for (k in t.Childs) {
			tp = TPL.table_option_item;
			if (t.Childs[k].Name == f.value) {
				tp = tp.replace('{CLASS}', 'class="current"');
			} else {
				tp = tp.replace('{CLASS}', '');
			}
			tp = tp.replace(/\{TITLE\}/g, t.Childs[k].Name);
			h[j] += tp;
		}
		
		h[j] = TPL.table_option.replace('{ITEMS}', h[j]);
		h[j] = h[j].replace('{TITLE}', t.Name);
	}
	mposP_DIALOG_SHOW(TPL.select_table.replace('{TABLE_OPTION}', h.join('')));
}

function mposVIEW_GOODS_ALBUM(rowindex) {
	var r = mposGOODS[rowindex];
	var i;
	var h = '';
	if (r.Album.length > 0) {
		for (i=0; i<r.Album.length; i++) {
			h += TPL.goods_album_item.replace('{ALBUM_ID}', r.Album[i]);
		}
		h = TPL.goods_album.replace('{ITEMS}', h);
		h = h.replace('{TITLE}', r.Name);
		h += TPL.action_close_goods_album;
		mposP_DIALOG_SHOW(h);
	}
}

function mposVIEW_GOODS_DESCRIPTION(rowindex) {
	var r = mposGOODS[rowindex];
	var i;
	var h = TPL.goods_information;
	var p = '';
	h = h.replace('{TITLE}'		,r.Name);
	h = h.replace('{PRICE}'		,r.Prices.Default);
	h = h.replace('{UNIT}'		,mposRETURN_UNIT_NAME_FROM_ID(r.UnitId));
	h = h.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(r.Id));
	h = h.replace('{ACTION}'	,'&nbsp;');
	if ('' != r.Description) {
		h = h.replace('{DESCRIPTION}', r.Description);
	} else {
		h = h.replace('{DESCRIPTION}', r.Name);
	}	
	h += TPL.action_close_goods_description;
	if (r.Album.length > 0) {
		for (i=0; i<r.Album.length; i++) {
			p += TPL.goods_album_item.replace('{ALBUM_ID}', r.Album[i]);
		}
		p = TPL.goods_album.replace('{ITEMS}', p);
		p = p.replace('{TITLE}', r.Name);
		h += p;
		h += TPL.action_close_goods_description;
	}
	event.cancelBubble = true;
	mposP_DESCRIPTION_SHOW(h);
}






function mposDIALOG_SET_OPTION_STATUS(n) {
	if ('' == n.className) {
		n.className = 'current';
	} else {
		n.className = '';
	}
}

function mposDIALOG_SET_GOODS_COUNT(n) {
	var p = n.parentNode.parentNode;
	var i = mposRETURN_NODE_INDEX(n.parentNode);
	p.childNodes[LastGoodsCountIndex].firstChild.className = '';
	LastGoodsCountIndex = i;
	p.childNodes[LastGoodsCountIndex].firstChild.className = 'current';
}

function mposDIALOG_SET_GOODS_PURCHASE(n) {
	var p = n.parentNode.parentNode;
	var i = mposRETURN_NODE_INDEX(n.parentNode);
	if (i == LastGoodsPurchaseIndex) {
		p.childNodes[LastGoodsPurchaseIndex].firstChild.className = '';
		LastGoodsPurchaseIndex = -1;
	} else {
		if (-1 != LastGoodsPurchaseIndex) {
			p.childNodes[LastGoodsPurchaseIndex].firstChild.className = '';
		}
		LastGoodsPurchaseIndex = i;
		p.childNodes[LastGoodsPurchaseIndex].firstChild.className = 'current';
	}
}

function mposDIALOG_SET_GOODS_VICE(n, c) {
	var p = n.parentNode.parentNode;
	var i = mposRETURN_NODE_INDEX(n.parentNode);
	p.childNodes[LastGoodsViceIndexs[c]].firstChild.className = '';
	LastGoodsViceIndexs[c] = i;
	p.childNodes[LastGoodsViceIndexs[c]].firstChild.className = 'current';
}





function mposADD_PAY_VALUE(v) {
	var f = mposRETURN_OBJECT_FROM_ID('send');
	f = f.firstChild;
	if (v > 0) {
		f.pay.value = parseInt(f.pay.value) + v;
	} else {
		f.pay.value = '0';
	}
	f.change.value = parseInt(f.pay.value) - parseInt(f.total.value);
	
}

function mposCHECK_PURCHASER() {
	if (null == localStorage.getItem(STORAGE_KEY_PURCHASER)) {
		localStorage.setItem(STORAGE_KEY_PURCHASER, TPL.TITLE.dear_customer);
	}
}

function mposCHECK_DATA_FOR_SEND(f) {
	var qt;
	switch (CurrentOrderMode) {
		case ORDER_MODE_TABLE:
			qt = TPL.CONFIRM.send_mode_table;
			break;
		default:
			if (parseInt(f.pay.value) < parseInt(f.total.value)) {
				alert(TPL.ALERT.more_pay);
				return false;
			}
			qt = TPL.CONFIRM.send;
			break;
	}
	if ('' == f.purchaser.value) {
		f.purchaser.value = TPL.TITLE.dear_customer;
	}
	localStorage.setItem(STORAGE_KEY_PURCHASER	,f.purchaser.value);
	localStorage.setItem(STORAGE_KEY_TOTAL		,f.total.value);
	localStorage.setItem(STORAGE_KEY_PAY		,f.pay.value);
	localStorage.setItem(STORAGE_KEY_CHANGE		,f.change.value);
	localStorage.setItem(STORAGE_KEY_MEMO		,f.memo.value);
	qt = qt.replace('{PURCHASER}'	,f.purchaser.value);
	qt = qt.replace('{TOTAL}'	,f.total.value);
	qt = qt.replace('{PAY}'		,f.pay.value);
	qt = qt.replace('{CHANGE}'	,f.change.value);
	if ('' != f.memo.value) {
		qt = qt.replace('{MEMO}', "\n"+'('+f.memo.value+')');
	} else {
		qt = qt.replace('{MEMO}', '');
	}
	return confirm(qt);
}

function mposCHECK_DATA_FOR_CALL(f) {
	var m;
	var qt = TPL.CONFIRM.call;
	if ('' == f.caller.value) {
		f.caller.value = TPL.TITLE.dear_customer;
	}
	if ('' == f.msg.value) {
		alert(TPL.ALERT.more_msg);
		f.msg.focus();
		return false;
	}
	if (f.msg.value.length > 64) {
		alert(TPL.ALERT.msg_too_length);
		f.msg.focus();
		return false;
	}
	m = f.msg.value;
	m = m.replace(/\r/g, '');
	m = m.replace(/\n/g, '<br>');
	localStorage.setItem(STORAGE_KEY_PURCHASER	,f.caller.value);
	localStorage.setItem(STORAGE_KEY_MSG	,m);
	qt = qt.replace('{CALLER}'	,f.caller.value);
	qt = qt.replace('{MSG}'		,f.msg.value);
	return confirm(qt);
}

function mposCHECK_DATA_FOR_GUESTBOOK(f) {
	var qt = TPL.CONFIRM.guestbook;
	if ('' == f.poster.value) {
		f.poster.value = TPL.TITLE.dear_customer;
	}
	if ('' == f.msg.value) {
		alert(TPL.ALERT.more_msg);
		f.msg.focus();
		return false;
	}
	localStorage.setItem(STORAGE_KEY_PURCHASER	,f.poster.value);
	qt = qt.replace('{POSTER}'	,f.poster.value);
	qt = qt.replace('{MSG}'		,f.msg.value);
	return confirm(qt);
}

function mposCHECK_TAB_IS_ORDER() {
	var h = mposRETURN_OBJECT_FROM_ID('header');
	var f = mposRETURN_OBJECT_FROM_ID('footer');
	var i;
	h = h.firstChild;
	f = f.firstChild;
	if ('current' != h.childNodes[TAB_ORDER].firstChild.className) {
		h.childNodes[LastTabIndex].firstChild.className = '';
		f.childNodes[LastTabIndex].firstChild.className = '';
		LastTabIndex = TAB_ORDER;
		h.childNodes[LastTabIndex].firstChild.className = 'current';
		f.childNodes[LastTabIndex].firstChild.className = 'current';
	}
}

function mposCHANGE_PAGE(h) {
	var pd = mposRETURN_OBJECT_FROM_ID('page');
	pd.innerHTML = h;
	document.body.scrollTop = 0;
	//document.body.scrollTop = 1;
}

function mposSCROLL_INTO_VIEW(id) {
	var o = mposRETURN_OBJECT_FROM_ID(id);
	if (o != null) {
		o.scrollIntoView(true);
	}
}

function mposCHECK_GOODS_SOLD_OUT() {
	var id2row = mposGOODS[mposGOODS.length-1].IdToRow;
	var k;
	for (k=0; k<id2row.length; k++) {
		GoodsIdIsSoldOut[k] = false;
	}
	for (k in mposSOLD_OUT) {
		GoodsIdIsSoldOut[mposSOLD_OUT[k]] = true;
	}
}

function mposCHECK_GOODS_CATEGORY_INDEX() {
	var id2row = mposGOODS[mposGOODS.length-1].IdToRow;
	var i;
	var j;
	var u;
	var c;
	var d;
	var r;
	for (i=0; i<id2row.length; i++) {
		GoodsIdToCategoryIndex[i] = -1;
		GoodsIdToCategoryGoodsRowIndex[i] = -1;
	}
	if (mposGOODS_CATEGORY.length > 1) {
		u = mposGOODS_CATEGORY.length - 1;
		for (i=0; i<u; i++) {
			c = mposGOODS_CATEGORY[i];
			if (!c.IsHideInOrder) {
				for (j in c.ChildIds) {
					d = c.ChildIds[j];
					r = id2row[d];
					if (-1 != r) {
						if (!mposGOODS[r].IsHideInOrder) {
							CategoryGoodsRowIndexs[CategoryGoodsRowIndexsCount] = r;
							GoodsIdToCategoryGoodsRowIndex[d] = CategoryGoodsRowIndexsCount;
							CategoryGoodsRowIndexsCount++;
							GoodsIdToCategoryIndex[d] = i;
						}
					}
				}
			}
		}
	}
}

function mposCHECK_GOODS_MENU_INDEX() {
	var id2row = mposGOODS[mposGOODS.length-1].IdToRow;
	var i;
	var j;
	var u;
	var m;
	var d;
	var r;
	for (i=0; i<id2row.length; i++) {
		GoodsIdToMenuIndex[i] = -1;
		GoodsIdToMenuGoodsRowIndex[i] = -1;
	}
	if (mposMENU.length > 1) {
		u = mposMENU.length - 1;
		for (i=0; i<u; i++) {
			m = mposMENU[i];
			for (j in m.Childs) {
				d = m.Childs[j].Id;
				r = id2row[d];
				if (-1 != r) {
					if (!mposGOODS[r].IsHideInOrder) {
						MenuGoodsRowIndexs[MenuGoodsRowIndexsCount] = r;
						if (-1 == GoodsIdToMenuGoodsRowIndex[d]) {
							GoodsIdToMenuGoodsRowIndex[d] = MenuGoodsRowIndexsCount;
						}
						MenuGoodsRowIndexsCount++;
						if (-1 == GoodsIdToMenuIndex[d]) {
							GoodsIdToMenuIndex[d] = i;
						}
					}
				}
			}
		}
	}
}




function mposRETURN_MEAL_OPTIONS(index) {
	var h = '';
	if ('' != MealList[index][MEAL_LIST_FLAVOR]) {
		h += '('+MealList[index][MEAL_LIST_FLAVOR]+')';
	}
	if ('' != MealList[index][MEAL_LIST_ADDITIONAL]) {
		h += '(+'+MealList[index][MEAL_LIST_ADDITIONAL]+')';
	}
	return h;
}

function mposRETURN_MEAL_TOTAL(index) {
	if ('' == MealList[index][MEAL_LIST_ADDITIONAL_PRICE]) {
		return MealList[index][MEAL_LIST_PRICE]+' x '+MealList[index][MEAL_LIST_COUNT]+' = '+MealList[index][MEAL_LIST_TOTAL];
	} else {
		return '('+MealList[index][MEAL_LIST_PRICE]+') x '+MealList[index][MEAL_LIST_COUNT]+' = '+MealList[index][MEAL_LIST_TOTAL];
	}
}






function mposRETURN_DIALOG_VICE_SELECTED(viceid) {
	var id2row = mposVICE[mposVICE.length-1].IdToRow;
	var v;
	var i;
	var j;
	var u;
	var d;
	SubGoodsRowIndexsCount = 0;
	CurrentSubGoodsRowIndex = 0;
	if (-1 != id2row[viceid]) {
		v = mposVICE[id2row[viceid]];
		id2row = mposGOODS[mposGOODS.length-1].IdToRow;
		for (j in v.Childs) {
			u = mposRETURN_OBJECT_FROM_ID('gvice'+j);
			u = u.nextSibling.firstChild;	
			for (i=0; i<u.childNodes.length; i++) {
				d = u.childNodes[i].firstChild;	
				if ('current' == d.className) {		
					SubGoodsRowIndexs[SubGoodsRowIndexsCount] = ViceRowIndexs[j][i];
					SubGoodsRowIndexsCount++;
					break;
				}
			}
		}
	}
	return (SubGoodsRowIndexsCount > 0);
}

function mposRETURN_DIALOG_VICE_OPTIONS(r) {
	var id2row = mposGOODS[mposGOODS.length-1].IdToRow;
	var v;
	var i;
	var j;
	var g;
	var o;
	var tp;
	var h = new Array();
	if (r.ViceId > 0) {
		v = mposVICE[mposVICE.length-1].IdToRow[r.ViceId];
		if (-1 != v) {
			v = mposVICE[v];
			for (j in v.Childs) {
				g = v.Childs[j];
				ViceRowIndexsCount[j] = 0;
				ViceRowIndexs[j] = new Array();
				h[j] = '';
				for (i in g.ChildIds) {
					o = id2row[g.ChildIds[i]];
					if (-1 != o) {
						ViceRowIndexs[j][ViceRowIndexsCount[j]] = o;
						o = mposGOODS[o];
						if (!GoodsIdIsSoldOut[o.Id]) {
							tp = TPL.vice_option_item;
							if (ViceRowIndexsCount[j] > 0) {
								tp = tp.replace('{CLASS}', '');
							} else {
								tp = tp.replace('{CLASS}', 'class="current"');
							}
							tp = tp.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(o.Id));
							tp = tp.replace('{INDEX}'	,j);
							tp = tp.replace('{TITLE}'	,o.Name);
							tp = tp.replace('{PRICE}'	,o.Prices.Vice);
							tp = tp.replace('{UNIT}'	,mposRETURN_UNIT_NAME_FROM_ID(o.UnitId));
							tp = tp.replace('{ROW}'		,ViceRowIndexs[j][ViceRowIndexsCount[j]]);
							h[j] += tp;

							ViceRowIndexsCount[j]++;
						}
					}
				}
				h[j] = TPL.vice_option.replace('{ITEMS}', h[j]);
				h[j] = h[j].replace('{INDEX}', j)
				h[j] = h[j].replace('{TITLE}', g.Name)
				LastGoodsViceIndexs[j] = 0;
			}
			return h.join('');
		}
	}
	return '';
}

function mposRETURN_DIALOG_PURCHASE_SELECTED(purchaseid) {
	var id2row = mposPURCHASE[mposPURCHASE.length-1].IdToRow;
	var i;
	var u = mposRETURN_OBJECT_FROM_ID('gpurchase');
	var d;
	SubGoodsRowIndexsCount = 0;
	CurrentSubGoodsRowIndex = 0;
	if (-1 != id2row[purchaseid]) {
		id2row = mposGOODS[mposGOODS.length-1].IdToRow;
		u = u.firstChild;	
		for (i=0; i<u.childNodes.length; i++) {
			d = u.childNodes[i].firstChild;	
			if ('current' == d.className) {		
				SubGoodsRowIndexs[SubGoodsRowIndexsCount] = PurchaseRowIndexs[i];
				SubGoodsRowIndexsCount++;
			}
		}
	}
	return (SubGoodsRowIndexsCount > 0);
}

function mposRETURN_DIALOG_PURCHASE_OPTIONS(r) {
	var id2row = mposGOODS[mposGOODS.length-1].IdToRow;
	var p;
	var i;
	var o;
	var tp;
	var h ='';
	PurchaseRowIndexsCount = 0;
	LastGoodsPurchaseIndex = -1;
	if (r.PurchaseId > 0) {
		p = mposPURCHASE[mposPURCHASE.length-1].IdToRow[r.PurchaseId];
		if (-1 != p) {
			p = mposPURCHASE[p];
			for (i in p.ChildIds) {
				o = id2row[p.ChildIds[i]];
				if (-1 != o) {
					PurchaseRowIndexs[PurchaseRowIndexsCount] = o;
					o = mposGOODS[o];
					if (!GoodsIdIsSoldOut[o.Id]) {
						tp = TPL.purchase_option_item;
						tp = tp.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(o.Id));
						tp = tp.replace('{TITLE}'	,o.Name);
						tp = tp.replace('{PRICE}'	,o.Prices.Purchase);
						tp = tp.replace('{UNIT}'	,mposRETURN_UNIT_NAME_FROM_ID(o.UnitId));
						tp = tp.replace('{ROW}'		,PurchaseRowIndexs[PurchaseRowIndexsCount]);
						h += tp;

						PurchaseRowIndexsCount++;
					}
				}
			}
			return TPL.purchase_option.replace('{ITEMS}', h);
		}
	}
	return '';
}

function mposRETURN_DIALOG_ADDITIONAL_SELECTED(additionalid) {
	var id2row = mposADDITIONAL[mposADDITIONAL.length-1].IdToRow;
	var mli = MealListCount - 1;
	var a;
	var ap = 0;
	var i;
	var u = mposRETURN_OBJECT_FROM_ID('gadditional');
	var d;
	var n = new Array();
	var r = new Array();
	var p = new Array();
	var j = 0;
	if (-1 != id2row[additionalid]) {
		a = mposADDITIONAL[id2row[additionalid]];
		u = u.firstChild;		
		for (i=0; i<u.childNodes.length; i++) {		
			d = u.childNodes[i].firstChild;
			if ('current' == d.className) {
				n[j] = a.Childs[i].Name;			
				r[j] = i;
				p[j] = a.Childs[i].Price;
				ap += p[j];
				j++;
			}
		}
		if (j > 0) {
			MealList[mli][MEAL_LIST_ADDITIONAL]		= n.join();
			MealList[mli][MEAL_LIST_ADDITIONAL_ROW_INDEXS]	= r.join();
			MealList[mli][MEAL_LIST_ADDITIONAL_PRICES]	= p.join();
			MealList[mli][MEAL_LIST_ADDITIONAL_PRICE]	= ap;
			MealList[mli][MEAL_LIST_PRICE] = MealList[mli][MEAL_LIST_ITEM_PRICE]+'+'+ap;
			MealList[mli][MEAL_LIST_TOTAL] = (parseInt(MealList[mli][MEAL_LIST_ITEM_PRICE]) + ap) * parseInt(MealList[mli][MEAL_LIST_COUNT]);
		}
	}
}


function mposRETURN_DIALOG_ADDITIONAL_OPTIONS(r) {
	var a;
	var i;
	var o;
	var tp;
	var h ='';
	if (r.AdditionalId > 0) {
		a = mposADDITIONAL[mposADDITIONAL.length-1].IdToRow[r.AdditionalId];
		if (-1 != a) {
			a = mposADDITIONAL[a];
			for (i in a.Childs) {
				o = a.Childs[i];
				tp = TPL.additional_option_item;
				tp = tp.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(o.Id));
				tp = tp.replace('{TITLE}'	,o.Name);
				tp = tp.replace('{PRICE}'	,o.Price);
				h += tp;
			}
			return TPL.additional_option.replace('{ITEMS}', h);
		}
	}
	return '';
}

function mposRETURN_DIALOG_FLAVOR_SELECTED(flavorid, flavorlimit) {
	var id2row = mposFLAVOR[mposFLAVOR.length-1].IdToRow;
	var mli = MealListCount - 1;
	var f;
	var i;
	var u = mposRETURN_OBJECT_FROM_ID('gflavor');
	var d;
	var n = new Array();
	var s = new Array();
	var j = 0;
	if (-1 != id2row[flavorid]) {
		f = mposFLAVOR[id2row[flavorid]];
		u = u.firstChild;		
		for (i=0; i<u.childNodes.length; i++) {
			d = u.childNodes[i].firstChild;
			if ('current' == d.className) {
				n[j] = f.Childs[i%f.Childs.length].Name;			
				s[j] = f.Childs[i%f.Childs.length].Id;	
				j++;
			}
		}
		if (flavorlimit > 0) {
			if (j == flavorlimit) {
				MealList[mli][MEAL_LIST_FLAVOR]			= n.join();
				MealList[mli][MEAL_LIST_FLAVOR_IDS]		= s.join();
				return true;
			} else {
				if (j > flavorlimit) {
					alert(TPL.ALERT.over_flavor_limit);
				} else {
					alert(TPL.ALERT.more_flavor.replace('{COUNT}', flavorlimit-j));
				}
			}
		} else {
			if (j > 0) {
				MealList[mli][MEAL_LIST_FLAVOR]			= n.join();
				MealList[mli][MEAL_LIST_FLAVOR_IDS]		= s.join();
			}
			return true;
		}
	} else {
		return true;
	}
	MealListCount--;
	return false;
}

function mposRETURN_DIALOG_FLAVOR_OPTIONS(r) {
	var f;
	var c;
	var i;
	var o;
	var tp;
	var h = '';
	if (r.FlavorId > 0) {
		f = mposFLAVOR[mposFLAVOR.length-1].IdToRow[r.FlavorId];
		if (-1 != f) {
			f = mposFLAVOR[f];
			c = 1;
			if (r.FlavorLimit > 0) {
				c = r.FlavorLimit;
			}
			for (j=0; j<c; j++) {
				for (i in f.Childs) {
					o = f.Childs[i];
					tp = TPL.flavor_option_item;
					tp = tp.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(o.Id));
					tp = tp.replace('{TITLE}'	,o.Name);
					h += tp;
				}
			}
			tp = TPL.flavor_option;
			if (r.FlavorLimit > 0) {
				tp = tp.replace('{LIMIT}', TPL.TITLE.flavor_limit.replace('{LIMIT}', r.FlavorLimit));
			} else {
				tp = tp.replace('{LIMIT}', '');
			}
			return tp.replace('{ITEMS}', h);
		}
	}
	return '';
}

function mposRETURN_DIALOG_COUNT_SELECTED() {
	var i;
	var u = mposRETURN_OBJECT_FROM_ID('gcount');
	var d;
	u = u.firstChild;	
	for (i=0; i<u.childNodes.length; i++) {
		d = u.childNodes[i].firstChild;	
		if ('current' == d.className) {
			return parseInt(d.innerText);
		}
	}
	return 0;
}

function mposRETURN_DIALOG_COUNT_OPTIONS(r) {
	var i;
	var tp;
	var h = '';
	tp = TPL.count_option_item
	tp = tp.replace('{CLASS}'	,'class="current"');
	tp = tp.replace('{VALUE}'	,'1');
	h += tp;
	for (i=2; i<10; i++) {
		tp = TPL.count_option_item
		tp = tp.replace('{CLASS}'	,'');
		tp = tp.replace('{VALUE}'	,i);
		h += tp;
	}
	LastGoodsCountIndex = 0;
	return TPL.count_option.replace('{ITEMS}', h);
}





function mposRETURN_GOODS_AD_ROWS() {
	var i;
	var c1;
	var c2;
	var h = '';
	for (i=0; i<3; i++) {
		c1 = mposRETURN_RND(1, 2);
		c2 = mposRETURN_RND(1, 2);
		if (1 == c1) {
			h += mposRETURN_GOODS_AD_WITH_COLS(1);
			if (1 == c2) {
				h += mposRETURN_GOODS_AD_WITH_COLS(1);
				h += mposRETURN_GOODS_AD_WITH_COLS(1);
			} else {
				h += mposRETURN_GOODS_AD_WITH_COLS(2);
			}
		} else {
			h += mposRETURN_GOODS_AD_WITH_COLS(2);
			h += mposRETURN_GOODS_AD_WITH_COLS(1);
		}
	}
	return TPL.goods_ad.replace('{ITEMS}', h);
}

function mposRETURN_GOODS_AD_WITH_COLS(c) {
	var id2row = mposGOODS_CATEGORY[mposGOODS_CATEGORY.length-1].IdToRow;
	var i;
	var r;
	var g;
	var h = TPL.goods_ad_item;
	while (true) {
		i = mposRETURN_RND(0, mposGOODS.length-2)
		r = mposGOODS[i];
		if (!r.IsHideInOrder) {
			g = id2row[r.CategoryId];
			if (-1 != g) {
				if (!mposGOODS_CATEGORY[g].IsHideInOrder) {
					break;
				}
			}
		}
	}
	h = h.replace(/\{COLS\}/g	,c);
	h = h.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(r.Id));
	h = h.replace('{ROW}'		,i);
	h = h.replace('{TITLE}'		,r.Name);
	h = h.replace('{PRICE}'		,r.Prices.Default);
	h = h.replace('{UNIT}'		,mposRETURN_UNIT_NAME_FROM_ID(r.UnitId));
	return h;
}

function mposRETURN_GOODS_WITH_LI(rowindex) {
	var h = TPL.each_goods_item;
	var r = mposGOODS[rowindex];
	if (!r.IsHideInOrder) {
		if (rowindex != CurrentGoodsIndex) {
			h = h.replace('{CLASS}', '');
		} else {
			h = h.replace('{CLASS}', 'class="current"');
		}
		h = h.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(r.Id));
		h = h.replace('{ROW}'		,rowindex);
		h = h.replace('{TITLE}'		,r.Name);
		h = h.replace('{PRICE}'		,r.Prices.Default);
		h = h.replace('{UNIT}'		,mposRETURN_UNIT_NAME_FROM_ID(r.UnitId));
		h = h.replace('{ACTION}'	,mposRETURN_GOODS_ACTION(rowindex, true));
		GoodsListCount++;
	} else {
		h = '';
	}
	return h;
}

function mposRETURN_GOODS_ACTION(rowindex, isicon) {
	var r = mposGOODS[rowindex];
	var tp;
	var h = '';
	if (isicon) {
		if (r.Album.length > 0) {
			h += TPL.goods_action_icon_album.replace('{ROW}', rowindex);
		}
		if (GoodsIdIsSoldOut[r.Id]) {
			h += TPL.goods_action_icon_soldout;
		} else {
			h += TPL.goods_action_icon_buy.replace('{ROW}', rowindex);
		}
	} else {
		if (r.Album.length > 0) {
			h += TPL.goods_action_item_album.replace('{ROW}', rowindex);
		}
		if (GoodsIdIsSoldOut[r.Id]) {
			h += TPL.goods_action_item_soldout;
		} else {
			h += TPL.goods_action_item_buy.replace('{ROW}', rowindex);
		}
	}
	return TPL.goods_action.replace('{ITEMS}', h);
}


function mposRETURN_GOODS_FULL_INFORMATION(rowindex, prevrow, nextrow) {
	var r = mposGOODS[rowindex];
	var h = '';
	if (!r.IsHideInOrder) {
		h = TPL.goods_information;
		h = h.replace('{TITLE}'		,r.Name);
		h = h.replace('{PRICE}'		,r.Prices.Default);
		h = h.replace('{UNIT}'		,mposRETURN_UNIT_NAME_FROM_ID(r.UnitId));
		h = h.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(r.Id));
		h = h.replace('{ACTION}'	,mposRETURN_GOODS_ACTION(rowindex, false));
		h = h.replace('{PREV_ROW}'	,prevrow);
		h = h.replace('{NEXT_ROW}'	,nextrow);
		if ('' != r.Description) {
			h = h.replace('{DESCRIPTION}', r.Description);
		} else {
			h = h.replace('{DESCRIPTION}', r.Name);
		}	
	}
	return h;
}

function mposRETURN_GOODS_INFO(rowindex) {
	var p = rowindex;
	var n = rowindex;
	var r = mposGOODS[rowindex];
	var h = '';
	if (mposCONFIG.OrderMenuMode) {
		p = GoodsIdToMenuGoodsRowIndex[r.Id];
		if (-1 != p) {
			n = p + 1;
			p = p - 1;
			if (n >= MenuGoodsRowIndexsCount) {
				n = 0;
			}
			if (p < 0) {
				p = MenuGoodsRowIndexsCount - 1;
			}
		} else {
			p = MenuGoodsRowIndexsCount - 1;
			n = 0;
		}
		h = mposRETURN_GOODS_FULL_INFORMATION(rowindex, MenuGoodsRowIndexs[p], MenuGoodsRowIndexs[n]);
		CurrentMenuIndex = GoodsIdToMenuIndex[r.Id];
		if (-1 != CurrentMenuIndex) {
			h += mposRETURN_MENU(CurrentMenuIndex);
		}
	} else {
		p = GoodsIdToCategoryGoodsRowIndex[r.Id];
		if (-1 != p) {
			n = p + 1;
			p = p - 1;
			if (n >= CategoryGoodsRowIndexsCount) {
				n = 0;
			}
			if (p < 0) {
				p = CategoryGoodsRowIndexsCount - 1;
			}
		} else {
			p = CategoryGoodsRowIndexsCount - 1;
			n = 0;
		}
		CurrentCategoryIndex = GoodsIdToCategoryIndex[r.Id];
		h = mposRETURN_GOODS_FULL_INFORMATION(rowindex, CategoryGoodsRowIndexs[p], CategoryGoodsRowIndexs[n]);
		h += mposRETURN_EACH_GOODS_IN_CATEGORY(CurrentCategoryIndex);
	}
	return h;
}

function mposRETURN_EACH_SEARCH(k) {
	var i;
	var f;
	var r;
	var u = mposGOODS.length - 1;
	var h = '';
	GoodsListCount = 0;
	for (i=0; i<u; i++) {
		f = false;
		r = mposGOODS[i];
		if (k == r.Barcode) {
			f = true;
		} else {
			if (-1 != r.Name.indexOf(k)) {
				f = true;
			}
		}
		if (f) {
			h += mposRETURN_GOODS_WITH_LI(i);
			if (0 == (GoodsListCount % GOODS_EACH_PAGE)) {		
				h +=TPL.each_goods_items_spliter;
			}
		}
	}
	h = TPL.each_goods.replace('{ITEMS}', h);
	h = h.replace('{TITLE}', TPL.TITLE.searched_goods.replace('{COUNT}', GoodsListCount));
	return h;
}

function mposRETURN_EACH_GOODS() {
	var i;
	var u = mposGOODS.length - 1;
	var h = '';
	GoodsListCount = 0;
	for (i=0; i<u; i++) {
		h += mposRETURN_GOODS_WITH_LI(i);
		if (0 == (GoodsListCount % GOODS_EACH_PAGE)) {		
			h += TPL.each_goods_items_spliter;
		}
	}
	h = TPL.each_goods.replace('{ITEMS}', h);
	h = h.replace('{TITLE}', TPL.TITLE.all_goods);
	return h;
}

function mposRETURN_EACH_GOODS_IN_CATEGORY(rowindex) {
	var id2row = mposGOODS[mposGOODS.length-1].IdToRow;
	var ids = mposGOODS_CATEGORY[rowindex].ChildIds;
	var k;
	var h = '';
	GoodsListCount = 0;
	for (k in ids) {
		h += mposRETURN_GOODS_WITH_LI(id2row[ids[k]]);
		if (0 == (GoodsListCount % GOODS_EACH_PAGE)) {
			h += TPL.each_goods_items_spliter;
		}
	}
	h = TPL.each_goods.replace('{ITEMS}', h);
	if (-1 == CurrentGoodsIndex) {
		h = h.replace('{TITLE}', mposGOODS_CATEGORY[rowindex].Name);
	} else {
		h = h.replace('{TITLE}', TPL.TITLE.same_category.replace('{NAME}', mposGOODS_CATEGORY[rowindex].Name));
	}
	return h;
}

function mposRETURN_EACH_GOODS_IN_TAG(rowindex) {
	var id2row = mposGOODS[mposGOODS.length-1].IdToRow;
	var ids = mposTAG[rowindex].ChildIds;
	var k;
	var i;
	var h = '';
	GoodsListCount = 0;
	for (k in ids) {
		i = id2row[ids[k]];
		if (-1 != i) {
			h += mposRETURN_GOODS_WITH_LI(i);
			if (0 == (GoodsListCount % GOODS_EACH_PAGE)) {
				h += TPL.each_goods_items_spliter;
			}
		}
	}
	h = TPL.each_goods.replace('{ITEMS}', h);
	h = h.replace('{TITLE}', mposTAG[rowindex].Name);
	return h;
}

function mposRETURN_EACH_CATEGORY() {
	var i;
	var u;
	var r;
	var tp;
	var h = TPL.each_category_item_all;
	if (mposTAG.length > 1) {
		u = mposTAG.length - 1;
		for (i=0; i<u; i++) {
			r = mposTAG[i];
			tp = TPL.each_category_item_tag
			if (i != CurrentTagIndex) {
				tp = tp.replace('{CLASS}'	,'');
			} else {
				tp = tp.replace('{CLASS}'	,'class="current"');
			}
			tp = tp.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(r.Id));
			tp = tp.replace('{ROW}'		,i);
			tp = tp.replace('{TITLE}'	,r.Name);
			h += tp;
		}
	}
	if (mposGOODS_CATEGORY.length > 1) {
		u = mposGOODS_CATEGORY.length - 1;
		for (i=0; i<u; i++) {
			r = mposGOODS_CATEGORY[i];
			if (!r.IsHideInOrder) {
				tp = TPL.each_category_item_category
				if (i != CurrentCategoryIndex) {
					tp = tp.replace('{CLASS}'	,'');
				} else {
					tp = tp.replace('{CLASS}'	,'class="current"');
				}
				tp = tp.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(r.Id));
				tp = tp.replace('{ROW}'		,i);
				tp = tp.replace('{TITLE}'	,r.Name);
				h += tp;
			}
		}
	}
	return TPL.each_category.replace('{ITEMS}', h);
}

function mposRETURN_MENU(rowindex) {
	var id2row = mposGOODS[mposGOODS.length-1].IdToRow;
	var u = mposMENU.length - 2;
	var m = mposMENU[rowindex];
	var p = rowindex - 1;
	var n = rowindex + 1;
	var gr;
	var i;
	var o;
	var tp;
	var h = '';
	if (p < 0) {
		p = u;
	}
	if (n > u) {
		n = 0;
	}
	for (i in m.Childs) {
		gr = id2row[m.Childs[i].Id];
		if (-1 != gr) {
			o = mposGOODS[gr];
			if (!o.IsHideInOrder) {
				tp = TPL.menu_item;
				if (gr != CurrentGoodsIndex) {
					tp = tp.replace('{CLASS}'	,'');
				} else {
					tp = tp.replace('{CLASS}'	,'class="current"');
				}
				tp = tp.replace('{TITLE}'	,o.Name);
				tp = tp.replace('{PRICE}'	,o.Prices.Default);
				tp = tp.replace('{UNIT}'	,mposRETURN_UNIT_NAME_FROM_ID(o.UnitId));
				tp = tp.replace('{LEFT}'	,m.Childs[i].Left);
				tp = tp.replace('{TOP}'		,m.Childs[i].Top);
				tp = tp.replace('{WIDTH}'	,m.Childs[i].Width);
				tp = tp.replace('{HEIGHT}'	,m.Childs[i].Height);
				tp = tp.replace('{ROW}'		,gr);
				h += tp;
			}
		}
	}
	h = TPL.menu.replace('{ITEMS}', h);
	h = h.replace('{TITLE}'		,m.Name);
	h = h.replace('{CURRENT}'	,rowindex+1);
	h = h.replace('{TOTAL}'		,u+1);
	h = h.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(m.Id));
	h = h.replace('{PREV_ROW}'	,p);
	h = h.replace('{NEXT_ROW}'	,n);
	return h;
}

function mposRETURN_EACH_MENU() {
	var i;
	var u;
	var r;
	var tp;
	var h = '';
	if (mposMENU.length > 1) {
		u = mposMENU.length - 1;
		for (i=0; i<u; i++) {
			r = mposMENU[i];
			tp = TPL.each_menu_item
			if (i != CurrentMenuIndex) {
				tp = tp.replace('{CLASS}'	,'');
			} else {
				tp = tp.replace('{CLASS}'	,'class="current"');
			}
			tp = tp.replace('{PHOTO_ID}'	,mposRETURN_ID_STR(r.Id));
			tp = tp.replace('{ROW}'		,i);
			tp = tp.replace('{TITLE}'	,r.Name);
			h += tp;
			if (0 == ((i+1) % MENU_EACH_PAGE)) {
				h += TPL.each_menu_items_spliter;
			}
		}
	}
	return TPL.each_menu.replace('{ITEMS}', h);
}

function mposRETURN_CURRENY_ITEMS() {
	var i;
	var tp;
	var h = '';
	for (i=0; i<mposCURRENCY.length; i++) {
		tp = TPL.tab_send_item;
		tp = tp.replace('{PHOTO_ID}', mposRETURN_ID_STR(mposCURRENCY[i]));
		if (mposCURRENCY[i] > 0) {
			tp = tp.replace('{TITLE}', '+'+mposCURRENCY[i]);
		} else {
			tp = tp.replace('{TITLE}', '='+mposCURRENCY[i]);
		}
		tp = tp.replace('{CURRENCY}', mposCURRENCY[i]);
		h += tp;
	}
	return h;
}

function mposRETURN_CONTACT() {
	var h = mposSTORES.Name+'<br>'+mposSTORES.Telephone+'<br>'+mposSTORES.Email+'<br>'+mposSTORES.Address;
	h += '<div class="project">'+PROJECT_COMPANY+': '+PROJECT_NAME+' v'+PROJECT_VERSION+'</div>';
	return h;
}

function mposRETURN_UNIT_NAME_FROM_ID(Id) {
	var id2row = mposUNIT[mposUNIT.length-1].IdToRow;
	var r = id2row[Id];
	if (-1 != r) {
		return mposUNIT[r].Name;
	} else {
		return TPL.TITLE.unknow_unit;
	}
}

function mposRETURN_ID_STR(Id) {
	var s = Id.toString();
	while (s.length < 4) {	
		s = '0' + s;
	}
	return s;
}

function mposRETURN_RND(min, max) {
	var v = Math.round(Math.random() * (max - min));
	v = v + min;
	return v;
}

function mposRETURN_NODE_INDEX(n) {
	var i = 0;
	n = n.previousSibling;
	while (n) {
		i++;
		n = n.previousSibling;
	}
	return i;
}

function mposRETURN_OBJECT_FROM_ID(id) {
	return document.getElementById(id);
}



