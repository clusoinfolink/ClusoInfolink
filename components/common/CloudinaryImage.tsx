import Image, { ImageProps } from 'next/image';

interface CloudinaryImageProps extends Omit<ImageProps, 'loader'> {
  src: string;
}

export function CloudinaryImage({ src, alt, ...props }: CloudinaryImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
    />
  );
}
