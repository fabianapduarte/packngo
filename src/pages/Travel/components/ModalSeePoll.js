import { useState, useEffect, useContext } from 'react'
import { ButtonOutlined, Modal } from '../../../components'
import { enumButtonColor } from '../../../enums/enumButtonColor'
import { useParams } from 'react-router-dom'

import { PollContext } from '../../../context/PollContext'

export const ModalSeePoll = ({ onClose, poll, onSuccess }) => {
  const [options, setOptions] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [optionMostVotedIndex, setOptionMostVotedIndex] = useState(null)
  const [totalVotes, setTotalVotes] = useState(0)
  const pollContext = useContext(PollContext)
  const { id } = useParams()

  useEffect(() => {
    if (poll) {
      let total = 0
      poll.options.forEach((option) => (total += option.totalVotes))
      setTotalVotes(total)

      setOptions(poll.options)

      const isToShowResults = poll.options.some((option) => option.isVoted)
      setShowResults(isToShowResults)

      if (isToShowResults) calculateResult(poll.options, total)
    }
  }, [poll])

  const handleVote = async (indexToVote) => {
    const updatedOptions = options.map((option, index) => {
      if (index === indexToVote) {
        return { ...option, totalVotes: option.totalVotes + 1 }
      } else return option
    })

    const { success } = await pollContext.voteItem({ id, idPoll: poll.id, idOption: updatedOptions[indexToVote].id })
    if (success) {
      setTotalVotes(totalVotes + 1)
      setShowResults(true)
      calculateResult(updatedOptions, totalVotes + 1)
      onSuccess()
    }
  }

  const calculateResult = (pollOptions, total) => {
    let maxVotes = 0
    let optionMostVoted = null

    const updatedOptions = pollOptions.map((option, index) => {
      if (option.totalVotes > maxVotes) {
        maxVotes = option.totalVotes
        optionMostVoted = index
      }

      if (total === 0) return { ...option, percentage: 0 }
      else return { ...option, percentage: Math.ceil((option.totalVotes / total) * 100) }
    })

    setOptions(updatedOptions)
    setOptionMostVotedIndex(optionMostVoted)
  }

  const OptionVoted = ({ isMostVoted, option, index }) => {
    return (
      <div className="flex items-center gap-2">
        {isMostVoted && (
          <div className="rounded px-3 py-2 bg-secondary text-white w-full" onClick={() => handleVote(index)}>
            {option.option}
          </div>
        )}
        {!isMostVoted && (
          <div
            className="rounded px-3 py-2 bg-white text-black border border-gray w-full"
            onClick={() => handleVote(index)}
          >
            {option.option}
          </div>
        )}
        <div className="font-semibold text-lg w-10 text-end">{option.percentage}%</div>
      </div>
    )
  }

  return (
    <Modal title={poll.title} onClose={onClose} size="md">
      <div className="flex flex-col gap-3 w-full mb-4">
        {showResults &&
          options.map((option, index) => (
            <OptionVoted
              key={`option-${index}`}
              isMostVoted={index === optionMostVotedIndex}
              option={option}
              index={index}
            />
          ))}
        {!showResults &&
          options.map((option, index) => (
            <ButtonOutlined
              key={`option-${index}`}
              color={enumButtonColor.gray}
              label={option.option}
              onClick={() => handleVote(index)}
              size="full"
            />
          ))}
      </div>
    </Modal>
  )
}
