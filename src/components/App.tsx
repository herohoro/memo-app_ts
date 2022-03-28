//FCはcomponentの型定義
import { ChangeEvent, FC, useCallback, useState } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";
import { useMemoList } from "../hooks/useMemoList";

export const App: FC = () => {
  //カスタムフックからそれぞれ取得
  const { memos, addTodo, deleteTodo } = useMemoList();
  //テキストボックスstate____<string>は型定義
  const [text, setText] = useState<string>("");

  //テキストボックス入力時に入力内容をStateに設定
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  //追加ボタン押下時
  const onClickAdd = () => {
    //カスタムフックのメモ追加ロジック実行
    addTodo(text);
    setText("");
  };
  //削除ボタン押下時(何番目が押されたかを引数で受け取る)
  const onClickDelete = useCallback(
    (index: number) => {
      //カスタムフックのメモ削除ロジック実行
      deleteTodo(index);
    },
    [deleteTodo]
  );

  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <input type="text" value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>追加</SButton>
      <MemoList memos={memos} onClickDelete={onClickDelete} />
    </div>
  );
};
const SButton = styled.button`
  margin-left: 16px;
`;
