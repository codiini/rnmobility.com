abort('Please run this using `bundle exec rake`') unless ENV["BUNDLE_BIN_PATH"]
require 'lightning_sites' # https://github.com/fulldecent/lightning-sites

@source_dir = '.'
@build_excludes.push('README.md','LICENSE','CONTRIBUTING.md')
production_base = 'pacific1@lv-shared02.dapanel.net:'
@remote_dir = "#{production_base}domains/savc.com.br/private_html"
@backup_targets = {
  'www' => "#{production_base}domains/savc.com.br/private_html",
  'logs' => "#{production_base}savc.com.br/logs"
}

desc "Perform website build"
task :build => ['jekyll:build', 'git:save_version']

desc "Perform all testing on the built HTML"
task :test do
  begin
    failed = false
        [:build, 'html:check', 'html:web_puc', 'html:check_mailto_awesome'].each do |t|
      begin
        Rake::Task[t].invoke
      rescue SystemExit => _
        failed = true
      end
    end
  end
  fail if failed
end

desc "Publish website to productions server"
task :publish => ['rsync:push']
