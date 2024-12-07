import { ReactElement } from "react";
import BooksIcon from "../../../components/icons/Books";
import FolderIcon from "../../../components/icons/Folder";
import QuestionIcon from "../../../components/icons/Question";

type WardCardConfig = {
    icon: ReactElement;
    title: string;
    class: string;
    type: string;
    amount: number;
  };

  const cardConfig: Record<string, WardCardConfig> = {
    subjectsAmount: {
      icon: <BooksIcon/>,
      title: 'No. of Subjects',
      class: 'bg-primary-gradient text-primary shadow-md-hover h-[200px]',
      type: '',
      amount: 500,
    },
    topicsAmount: {
      icon: <FolderIcon/>,
      title: 'No. of Topics',
      class: 'bg-grey-gradient text-green shadow-md-hover h-[200px]',
      type: '',
      amount: 1300,
    },
    testsAmount: {
      icon: <QuestionIcon/>,
      title: 'No. of Tests',
      class: 'bg-primary-gradient text-secondary shadow-md-hover h-[200px]',
      type: '',
      amount: 1000,
    },
  };

  export default cardConfig;
