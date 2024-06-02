var mockProductList = [
    {
        pno: 1,
        name: "Do it ! 자바프로그래밍 입문",
        description: "자바 프로그래밍을 입문하는데 있어서 최적의 책!",
        price: 15500,
        src: "resources/images/java.jpg"
    },
    {
        pno: 2,
        name: "Do it ! 오라클로 배우는 데이터베이스 입문",
        description: "오라클을 입문하는데 있어서 최적의 책!",
        price: 20000,
        src: "resources/images/oracle.jpg"
    },
    {
        pno: 3,
        name: "Do it! 리액트 네이티브 앱 프로그래밍",
        description: "리액트 네이티브를 입문하는데 있어서 최적의 책!",
        price: 44200,
        src: "resources/images/react.jpg"
    },
    {
        pno: 4,
        name: "Do it ! HTML+CSS+자바스크립트 웹 표준의 정석",
        description: "HTML+CSS+자바스크립트 프로그래밍을 입문하는데 있어서 최적의 책!",
        price: 30000,
        src: "resources/images/html.jpg"
    },
    {
        pno: 5,
        name: "JSP 웹 프로그래밍과 스프링 프레임워크",
        description: "JSP를 입문하는데 있어서 최적의 책!",
        price: 27000,
        src: "resources/images/jsp.jpg"
    },
    {
        pno: 6,
        name: "리액트 200제",
        description: "리액트를 입문하는데 있어서 최적의 책!",
        price: 22500,
        src: "resources/images/react200.PNG"
    },
    {
        pno: 7,
        name: "Do it! 자바스크립트 입문",
        description: "자바스크립트를 입문하는데 있어서 최적의 책!",
        price: 16200,
        src: "resources/images/js.png"
    },
    {
        pno: 8,
        name: "Node.js 프로그래밍 입문",
        description: "Node.js을 입문하는데 있어서 최적의 책!",
        price: 32400,
        src: "resources/images/node.png"
    },
]


// 초기 데이터 추가
$(function () {
    $.each(mockProductList, function (value) {
        var $tempitem = $(`.item${this.pno}`);
        var url = './' + this.src;

        $tempitem.children('#item-img').css('backgroundImage', `url('${url}')`);
        $tempitem.children('#item-title').prop('innerText', this.name);
        $tempitem.children('#item-description').prop('innerText', this.description);
        $tempitem.children('#item-price').prop('innerText', this.price + "원");
    });
});

// 마우스 대었을때 확대 표시
$(function () {
    $('.item').hover(function () {
        $(this).css('transform', 'scale(1.1)');
    }, function () {
        $(this).css('transform', 'scale(1)');
    });
});

// '장바구니담기' 대었을때 색깔 변경
$(function () {
    $('.item').children('input[type=button]').hover(function () {
        $(this).css('color', 'red');
    }, function () {
        $(this).css('color', 'white');
    });
});


// 모달 - 닫기창 마우스 대었을때 확대  , 색깔 변경
$(function () {
    $('#turn-off>input[type=button]').hover(function () {
        $(this).css('color', 'red');
        $(this).css('transform', 'scale(1.5)');
    }, function () {
        $(this).css('color', 'black');
        $(this).css('transform', 'scale(1)');
    });
});

// 장바구니 - 삭제 버튼 대었을때 색깔 변경
$(document).on('mouseenter', '#basket-item>input[type=button]', function (e) {
    $(e.target).css('color', 'red');
});

$(document).on('mouseleave', '#basket-item>input[type=button]', function (e) {
    $(e.target).css('color', 'black');
});

// ---------------- 검색기능과 관련된 코드 시작----------------

// load
$(function () {

    // 1. 검색창 - 엔터 키 입력시 값 초기화 후 값 전달
    $('.search-form-keyword>input[type=text]').on('keydown', function (key) {
        if (key.keyCode == 13) serarch();
    });

    // 2. 검색창 옆 button 클릭시 값 초기화 후 값 전달
    $('.search-form-btn>input[type=button]').click(serarch);
});

// 전달된 키워드 값을 통해 item의 display 속성을 변경 시킴 block - none
function serarch() {
    var $items = $('.item');
    var $keywordset = $('.search-form-keyword>input[type=text]');
    var $keyword = $keywordset.val().toUpperCase();

    $items.each(function (index, ele) {
        var $itemtitle = $(ele).children("#item-title").prop('innerText').toUpperCase();

        ($itemtitle.includes($keyword)) && ($(this).css('display', 'block'));
        ($itemtitle.includes($keyword)) || ($(this).css('display', 'none'));
    });

    $keywordset.val("");
}

// ---------------- 검색기능과 관련된 코드 끝----------------


// ---------------- 모달기능과 관련된 코드 시작----------------

// 아이템 창의 이미지 선택시 숨겨 있던 모달창 (아이템 + 배경) display 속성을 변경 시킴
$(function () {
    $('.item').children('#item-img').click(function () {
        var $temp = $(this).parent();
        var $pno = ($temp.attr('class')).replaceAll(/[^0-9]/g, '');

        var $modalitem = $('.modal-item');
        var mockProduct = mockProductList[$pno - 1];

        var url = './' + mockProduct.src;
        $modalitem.children('#item-img').css('backgroundImage', `url('${url}')`);
        $modalitem.children('#item-title').prop('innerHTML', '<p>' + mockProduct.name + '</p>');
        $modalitem.children('#item-description').prop('innerHTML', '<p>' + mockProduct.description + '</p>');
        $modalitem.children('#item-price').prop('innerHTML', '<p>' + mockProduct.price + "원</p>");

        $('.modal-item').css('display', 'block');
        $('.modal-background').css('display', 'block');

    });

    // 추가된 button클릭시 모달창 전체 display 속성을 none 으로 변경 시킴
    $('#turn-off>input[type=button]').click(function () {
        $('.modal-item').css('display', 'none');
        $('.modal-background').css('display', 'none');
    })
});

// ---------------- 모달기능과 관련된 코드 끝----------------


// ---------------- 장바구니추가 관련된 코드 시작--------------

// item - 장바구니 버튼 선택시 이벤트 발생
/*
    아이템 요소 추가
    1. 표현할 장바구니 리스트(#basket-list) , 선택한 장바구니의 부모 요소(item 전체)를 선택
    2. 각 부모 요소중의 제목 , 가격 값을 받아와서 하나의 문자열로 치환
    3. 삭제 버튼 + 표현할 문자열 + 밑줄(<hr>) 을 관리할 div 태그 생성 (#basket-item)
    4. 장바구니의 하나 하나의 요소는 #basket-item로 관리되며 , 이 하위 속성 (버튼 , 내용 , 밑줄)을 append를 통해 추가

    총 가격 계산
    1. 받아온 문자열 중에서 가격에 해당하는 부분은 정규식을 통해 분리함
    2. 받아온 문자열을 Number 형태로 받아온 후 , totalprice() 라는 별도 함수에서 계산함
*/
$(function () {
    $('.item').children('input[type=button]').click(function () {
        var $basketlist = $('#basket-list');
        var $selector = $(this).parent();

        var $selectortitle = $selector.children('#item-title');
        var $selectorprice = $selector.children('#item-price');

        var output = $selectortitle.prop('innerText') + " - " + $selectorprice.prop('innerText')

        $basketlist.append('<div id="basket-item"></div>');
        var $basketitem = $basketlist.children('#basket-item').last();

        $basketitem.append('<input type="button" value="-">');
        $basketitem.append('<div id="basket-content">' + output + '</div>');
        $basketitem.append('<hr>');

        totalprice(Number(($selectorprice.prop('innerText')).replace(/원/, "")), 1);
    });
});

// 추가 요소 : 장바구니 옆에 추가된 버튼 삭제시 해당 하는 아이템 요소 삭제
// 동적으로 추가된 요소의 이벤트 관리를 해야함
$(document).on('click', '#basket-item>input[type=button]', function (e) {

    var $temp = $(e.target).parent().children('#basket-content').prop('innerText');
    var $price = $temp.match(/[0-9]+원$/, 'g')[0].replace(/원/, "");

    totalprice(Number($price), 0);

    $(e.target).parent().remove();
});

// ---------------- 장바구니추가 관련된 코드 끝----------------


// ---------------- 장바구니상품 가격계산 관련된 코드 시작--------------

// 장바구니 추가 + 아이템 삭제 시에만 일어나도록
// selector == 1 = true (아이템 추가 , 덧셈)
// selector == 0 = false (아이템 삭제 , 빼기)

function totalprice(inputprice, selector) {
    var totalprice = Number($('#total-count').prop('innerText'));
    selector && (totalprice += inputprice);
    selector || (totalprice -= inputprice);
    $('#total-count').prop('innerText', totalprice);
}

// ---------------- 장바구니상품 가격계산 관련된 코드 끝----------------