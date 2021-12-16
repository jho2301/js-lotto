import ERROR_MESSAGE from '../constant/errorMessage.js';
import { ANSWER_INPUT_NAMES } from '../constant/lotto.js';
import lottoManager from '../model/lotto.js';
import { getAnswerErrorMessage, isValidLottoInput } from '../service/lotto.js';
import { focusPaymentInput, resetMainView } from '../view/main.js';
import { closeModal, openModal, updateResultView } from '../view/resultModal.js';

const filterAnswer = (elements) =>
  Object.fromEntries(
    Object.entries(elements)
      .filter(([key]) => ANSWER_INPUT_NAMES.includes(key))
      .map(([key, value]) => [key, value.valueAsNumber])
  );

const isValidAnswer = (answer) => {
  return lottoManager.amount && isValidLottoInput(answer) && !lottoManager.hasLeft();
};

export const handleLottoAnswer = (event) => {
  event.preventDefault();

  const answer = filterAnswer(event.target.elements);

  if (!isValidAnswer(answer)) {
    alert(getAnswerErrorMessage(answer));
    return;
  }

  lottoManager.setResult(answer);
  updateResultView(lottoManager.result);
  openModal();
};

export const handleModalClose = () => {
  lottoManager.resetAll();
  resetMainView();
  focusPaymentInput();
  closeModal();
};

export const handleModalCloseOuter = ({ target, currentTarget }) => {
  if (target !== currentTarget) return;

  handleModalClose();
};
