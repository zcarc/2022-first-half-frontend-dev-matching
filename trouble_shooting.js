    // 자식노드 삭제 함수
    const remove_child_elements = () => {
        // 문자열 'ul'이 아니라 [object HTMLUListEment] 객체이다.
        // if (Suggestion.childNodes.length > 0 && Suggestion.childNodes[0] == 'ul') {
            // Suggestion.removeChild(Suggestion.firstChild)
            // console.log('### Suggestion', Suggestion)
        // }
        if (Suggestion.childNodes.length > 0 && Suggestion.childNodes[0].nodeName.toLowerCase() === 'ul') {
            Suggestion.removeChild(Suggestion.firstChild)
        }
        if (App.contains(Suggestion)) {
            App.removeChild(Suggestion)
        }

    }

    // 처음에 문제를 노드를 삭제하지 않고 스타일을 추가해서 CSS 스타일에서 감추는 방법을 생각했었는데 
    // JS로 구현하고 생각해보니 노드가 동적인 데이터라서 숨기는게 아니라 삭제를 했어야했다. 
    
    // Suggestion 노드의 자식노드는 ul만 존재해서 자식노드가 존재하는 경우인
    // .hasChildNodes() 메서드로 확인할 수 있었으나, 이름이 'ul'인 경우는 어떻게 접근하는 지 궁금해서 해당 노드 이름일 경우에만 조건문이 실행되도록 했다.
    

    // 검색된 결과 li 태그 목록에서 selected 클래스를 추가하기 위해서 반복문을 변경했다.
    // 변겅 전
    res.forEach((item) => {
        const li = document.createElement('li')
        li.innerText = item
        ul.append(li)
    })

    // 변경 후
    for (i = 0; i < res.length; i++) {
        const li = document.createElement('li')
        if (i === 0) {
            li.classList.add('Suggestion__item--selected')
        }
        li.innerText = res[i]
        ul.append(li)
    }

    // 최대한 풀이방법을 보지 않고 풀려고 했었다.
    // 문제를 보고 구현방법이 떠오르지 않았던 것도 많았고,
    // 할 수 있을 것이라고 생각한 부분도 쉬울 것이라고 생각했지만 막상 해보니 그렇게 쉽지 않았다. 
    // 문제풀이가 내가 작성한 방법보다는 더 효율적일 것이라고 생각해서
    // 일단 생각나는대로 풀어보고 나중에 비교해보자는 생각을 했다.