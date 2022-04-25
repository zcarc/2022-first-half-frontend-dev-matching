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
    