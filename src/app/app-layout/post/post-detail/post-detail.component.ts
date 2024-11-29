import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  content: string = `
  <h3 style="text-align:center;">
    <span style="font-family:'Times New Roman';">
      <strong>CÁC CHIẾN SĨ VNCH ĐÃ CHIẾN ĐẤU QUẢ CẢM Ở HOÀNG SA NHƯ THẾ NÀO</strong>
    </span>
  </h3>
  <p style="text-align:center;">&nbsp;</p>
  <figure class="image image_resized" style="width:625px;">
    <img style="aspect-ratio:500/340;" src="http://localhost:8888/upload/product/hoang-sa-(3)20241129_095150.jpg" width="500" height="340">
  </figure>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
`;

  ngOnInit(): void {
  }

  get sanitizedContent() {
    this.addLazyLoadingToImages();
    return this.sanitizer.bypassSecurityTrustHtml(this.content);
  }

  addLazyLoadingToImages() {
    const imgRegex = /<img\s+([^>]+)>/g;
    this.content = this.content.replace(imgRegex, (match: string, group: string) => {
      // Thêm hoặc thay đổi thuộc tính "loading" thành "lazy"
      if (!group.includes('loading="lazy"')) {
        return `<img ${group} loading="lazy">`;
      }
      return match; // Nếu đã có thuộc tính "lazy", giữ nguyên
    });
  }





}
