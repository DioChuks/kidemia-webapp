import { ReactElement } from "react";
import UsersIcon from "../../../components/icons/Users";
import BooksIcon from "../../../components/icons/Books";
import FolderIcon from "../../../components/icons/Folder";
import QuestionIcon from "../../../components/icons/Question";

type CardConfig = {
    icon: ReactElement;
    title: string;
    class: string;
    type: string;
    amount: number;
  };

  const cardConfig: Record<string, CardConfig> = {
    studentsAmount: {
      icon: <UsersIcon/>,
      title: 'No. of Students',
      class: 'bg-grey-gradient shadow-md-hover',
      type: 'p-10 bg-grey-200',
      amount: 1200,
    },
    subjectsAmount: {
      icon: <BooksIcon/>,
      title: 'No. of Subjects',
      class: 'bg-primary-gradient text-primary shadow-md-hover',
      type: '',
      amount: 500,
    },
    topicsAmount: {
      icon: <FolderIcon/>,
      title: 'No. of Topics',
      class: 'bg-grey-gradient text-green shadow-md-hover',
      type: '',
      amount: 1300,
    },
    testsAmount: {
      icon: <QuestionIcon/>,
      title: 'No. of Tests',
      class: 'bg-primary-gradient text-secondary shadow-md-hover',
      type: '',
      amount: 1000,
    },
  };

  export default cardConfig;
