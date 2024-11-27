import { useState, useEffect } from 'react'
import { Button, ButtonOutlined, Modal } from '../../components'
import { enumButtonColor } from '../../enums/enumButtonColor'

export const ModalSeePoll = ({ onClose, poll }) => {
  const [options, setOptions] = useState(poll.options)
  const [showResults, setShowResults] = useState(!poll.open)
  const [optionMostVotedIndex, setOptionMostVotedIndex] = useState(null)
  const [totalVotes, setTotalVotes] = useState(0)

  useEffect(() => {
    let total = 0
    options.forEach((option) => (total += option.votes))
    setTotalVotes(total)
  }, [options])

  const handleVote = (indexToVote) => {
    const updatedOptions = options.map((option, index) => {
      if (index === indexToVote) return { ...option, votes: option.votes + 1 }
      else return option
    })
    calculateResult(updatedOptions)
    setOptions(updatedOptions)
    setShowResults(true)
  }

  const calculateResult = (pollOptions) => {
    let maxVotes = 0
    let optionMostVoted = null

    const updatedOptions = pollOptions.map((option, index) => {
      if (option.votes > maxVotes) {
        maxVotes = option.votes
        optionMostVoted = index
      }

      return { ...option, percentage: (option.votes / totalVotes) * 100 }
    })

    setOptions(updatedOptions)
    setOptionMostVotedIndex(optionMostVoted)
  }

  const OptionVoted = ({ isMostVoted, option }) => {
    return (
      <div className="flex items-center gap-2">
        {isMostVoted && <Button color={enumButtonColor.secondary} label={option.value} disabled={true} size="full" />}
        {!isMostVoted && (
          <ButtonOutlined color={enumButtonColor.primary} label={option.value} disabled={true} size="full" />
        )}
        <div className="font-semibold text-lg">{option.percentage}</div>
      </div>
    )
  }

  return (
    <Modal title={poll.title} onClose={onClose} size="md">
      <div className="flex flex-col gap-3 w-full mb-4">
        {showResults &&
          options.map((option, index) => <OptionVoted isMostVoted={index === optionMostVotedIndex} option={option} />)}
        {!showResults &&
          options.map((option) => (
            <ButtonOutlined
              color={enumButtonColor.primary}
              label={option.value}
              disabled={!poll.open}
              onClick={handleVote}
              size="full"
            />
          ))}
      </div>
    </Modal>
  )
}
