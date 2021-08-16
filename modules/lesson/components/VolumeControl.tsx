import {
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'

type VolumeControlProps = SliderProps & {
  volume?: number
  onChangeEnd?: (value: number) => void
  onChange?: (value: number) => void
}

function VolumeControl({
  volume = 0.5,
  onChangeEnd,
  onChange,
  ...rest
}: VolumeControlProps) {
  return (
    <>
      <Slider
        aria-label="Volume"
        onChangeEnd={(value) => onChangeEnd?.(value / 100)}
        onChange={(value) => onChange?.(value / 100)}
        defaultValue={volume * 100}
        {...rest}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  )
}

export default VolumeControl
